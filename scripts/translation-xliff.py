#!/usr/bin/env python3
"""Exchange the shared Next.js messages as XLIFF 2.1."""

import argparse
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from stat import S_IMODE
from tempfile import NamedTemporaryFile


NAMESPACE = "urn:oasis:names:tc:xliff:document:2.0"
CATALOGS = Path(__file__).resolve().parents[1] / "src" / "i18n"
PLACEHOLDER = re.compile(r"\{\w+\}")
ET.register_namespace("", NAMESPACE)


def tag(local_name):
    return f"{{{NAMESPACE}}}{local_name}"


def catalog(locale):
    return json.loads((CATALOGS / f"{locale}.json").read_text(encoding="utf-8"))


def export_xliff(path, english, spanish, source_history):
    root = ET.Element(tag("xliff"), version="2.1", srcLang="en", trgLang="es")
    file = ET.SubElement(root, tag("file"), id="messages", original="src/i18n/en.json")
    for key, source in english.items():
        unit = ET.SubElement(file, tag("unit"), id=key, canResegment="no")
        target = spanish.get(key)
        previous_source = source_history.get(key)
        is_current = bool(target) and previous_source == source
        if target and not is_current:
            notes = ET.SubElement(unit, tag("notes"))
            ET.SubElement(notes, tag("note"), category="translation-review").text = (
                "The English source changed or has not been recorded. Review the previous translation."
            )
            if previous_source is not None:
                ET.SubElement(notes, tag("note"), category="previous-source").text = previous_source
            ET.SubElement(notes, tag("note"), category="previous-translation").text = target
        segment = ET.SubElement(unit, tag("segment"), state="translated" if is_current else "initial")
        ET.SubElement(segment, tag("source")).text = source
        if is_current:
            ET.SubElement(segment, tag("target")).text = target
    ET.indent(root, space="  ")
    ET.ElementTree(root).write(path, encoding="utf-8", xml_declaration=True)


def import_xliff(path, english, spanish, source_history):
    root = ET.parse(path).getroot()
    if root.tag != tag("xliff") or root.get("version") != "2.1":
        raise ValueError("Expected an XLIFF 2.1 document")
    if root.get("srcLang") != "en" or root.get("trgLang") != "es":
        raise ValueError("Expected an English-to-Spanish translation")
    seen = set()
    updates = {}
    for unit in root.iter(tag("unit")):
        key = unit.get("id")
        if key not in english or key in seen:
            raise ValueError(f"Unknown or duplicate message ID {key!r}")
        seen.add(key)
        segments = unit.findall(tag("segment"))
        if len(segments) != 1:
            raise ValueError(f"Expected one segment for {key}")
        source = segments[0].find(tag("source"))
        target = segments[0].find(tag("target"))
        if source is None or len(source) or source.text != english[key]:
            raise ValueError(f"English source changed for {key}. Export a fresh XLIFF file.")
        if target is None:
            continue
        if len(target):
            raise ValueError(f"Translation for {key} must use plain text")
        if not target.text or not target.text.strip():
            continue
        if sorted(PLACEHOLDER.findall(target.text)) != sorted(PLACEHOLDER.findall(source.text)):
            raise ValueError(f"Translation for {key} must preserve its placeholders")
        if (source_history.get(key) != english[key] and target.text == spanish.get(key)
                and segments[0].get("state", "initial") == "initial"):
            continue
        updates[key] = target.text
    updated = {**spanish, **updates}
    updated_history = {**source_history, **{key: english[key] for key in updates}}
    # Write the translation first so a failed history update still flags it for review.
    if updated != spanish:
        write_catalog("es", updated)
    if updated_history != source_history:
        write_catalog("es.sources", updated_history)


def write_catalog(name, messages):
    destination = CATALOGS / f"{name}.json"
    with NamedTemporaryFile(mode="w", encoding="utf-8", dir=CATALOGS, delete=False) as temporary:
        temporary_path = Path(temporary.name)
        try:
            temporary.write(json.dumps(messages, indent=2, ensure_ascii=False) + "\n")
            temporary.close()
            if destination.exists():
                temporary_path.chmod(S_IMODE(destination.stat().st_mode))
            temporary_path.replace(destination)
        finally:
            temporary_path.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("export", "import"))
    parser.add_argument("file", type=Path)
    args = parser.parse_args()
    try:
        operation = export_xliff if args.command == "export" else import_xliff
        operation(args.file, catalog("en"), catalog("es"), catalog("es.sources"))
    except (OSError, ET.ParseError, ValueError) as error:
        parser.exit(1, f"{error}\n")


if __name__ == "__main__":
    main()
