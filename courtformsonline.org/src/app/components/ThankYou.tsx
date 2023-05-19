import Link from "next/link";
import Image from "next/image";
import { Interface } from "readline";
import styles from './ThankYou.module.css';

interface Organization {
  name: string;
  url: string;
  icon: string;
  width: number;
  height: number;
}

const organizations: Array<Organization> = [
  {
    name: "Legal Innovation and Technology Lab",
    url: "https://suffolklitlab.org",
    icon: "lit_logo.png",
    width: 58,
    height: 50,
  },
  {
    name: "Massachusetts Access to Justice Commission",
    url: "https://massa2j.org",
    icon: "a2j_logo.png",
    width: 141,
    height: 35,
  },
  {
    name: "Docassemble",
    url: "https://docassemble.org",
    icon: "docassemble_logo.png",
    width: 131,
    height: 61,
  },
  {
    name: "Civil Legal Aid for Victims of Crime",
    url: "https://massclavc.org/",
    icon: "clavc_logo.png",
    width: 91,
    height: 60,
  },
  {
    name: "Greater Boston Legal Services",
    url: "https://www.gbls.org",
    icon: "gbls_logo.png",
    width: 163,
    height: 60,
  },
  {
    name: "Northeast Legal Aid",
    url: "https://www.northeastlegalaid.org/",
    icon: "ne_legal_aid_logo.png",
    width: 90,
    height: 60,
  },
  {
    name: "Massachusetts Law Reform Institute",
    url: "https://mlri.org/",
    icon: "mlri_logo.png",
    width: 192,
    height: 60,
  },
  {
    name: "Theory and Principle",
    url: "https://www.theoryandprinciple.com/",
    icon: "tp_logo.png",
    width: 141,
    height: 40,
  },
  {
    name: "NuLawLab",
    url: "https://www.nulawlab.org/",
    icon: "nulawlab_logo.png",
    width: 152,
    height: 35,
  },  
  {
    name: "AppGeo",
    url: "https://www.appgeo.com/",
    icon: "appgeo_logo.png",
    width: 106,
    height: 45,
  },
  {
    name: "Bentley University Court UX Team",
    url: "https://www.bentley.edu/academics/graduate-programs/masters-human-factors/",
    icon: "court_UX_logo.png",
    width: 147,
    height: 60,
  },
  {
    name: "Community Lawyer",
    url: "https://afterpattern.com/",
    icon: "cl_logo.png",
    width: 137,
    height: 40,
  },
  {
    name: "Gavel",
    url: "https://gavel.io",
    icon: "gavel_logo.png",
    width: 103,
    height: 32,
  },
];

export default function ThankYou() {
  return (
    <section className={ styles.ThankYouSection }>
      <div className="container">
        <h2>Thank you</h2>
        <p>
          The organizations listed below all helped build the first version of
          Court Forms Online. It would not exist without their help.
        </p>
        <div className="row row-cols-1 row-cols-md-6 g-4 mt-4">
          {organizations.map((org) => {
            return (
              <div className="col" key={org.name}>
                <Link href={org.url}>
                <Image
                  src={"/partners/" + org.icon}
                  alt={org.name}
                  height={org.height}
                  width={org.width}
                />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
