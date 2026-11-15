import {
  keywordMatches,
  matchingTopics,
  rankFormsByTopics,
} from '../src/data/formSearch';

const eviction = {
  filename: 'eviction.yml',
  metadata: {
    title: 'Eviction Answer',
    description: 'Respond to your landlord',
  },
};
const fee = {
  filename: 'fees.yml',
  metadata: {
    title: 'Fee waiver',
    description: 'Ask to waive fees in an eviction case',
  },
};
const interviews = {
  housing: [eviction, fee],
  courts: [fee],
  family: [eviction],
};

test('title words match regardless of case and punctuation, without duplicate forms', () => {
  expect(keywordMatches(interviews, ' EVICTION! ')).toEqual({
    titles: [eviction],
    descriptions: [fee],
  });
  expect(keywordMatches(interviews, 'evict').titles).toEqual([]);
  expect(keywordMatches(interviews, 'fee WAIVER').titles).toEqual([fee]);
  expect(keywordMatches(interviews, 'the and').titles).toEqual([]);
});

test('maps descendant LIST codes, sorts by confidence and deduplicates topics', () => {
  expect(
    matchingTopics(
      [
        { id: 'HO-02-01-00-00', confidence: 0.8 },
        { id: 'HO-00-00-00-00', confidence: 0.6 },
        { id: 'FA-00-00-00-00', confidence: 0.9 },
        { id: 'XX-00-00-00-00', confidence: 1 },
      ],
      interviews
    ).map((topic) => topic.name)
  ).toEqual(['family', 'housing']);
});

describe('ranking forms within a topic', () => {
  const form = (title: string, codes: string[]) => ({
    metadata: { title, LIST_topics: codes },
  });
  test('specific lockout and eviction tools precede broadly tagged housing forms', () => {
    const broad = form('Appeal eviction', ['HO-02-00-00-00']);
    const search = form('Housing search log', ['HO-00-00-00-00']);
    const tro = form('Housing TRO', ['HO-02-08-00-00']);
    const made = form('MADE', [
      'HO-02-00-00-00',
      'HO-02-03-02-00',
      'HO-02-03-02-01',
    ]);
    const upToCode = form('UpToCode', ['HO-02-08-00-00', 'HO-05-01-00-00']);
    const forms = [broad, search, tro, made, upToCode];
    const sorted = rankFormsByTopics(forms, [
      { id: 'HO-02-08-00-00', confidence: 2 },
      { id: 'HO-02-03-00-00', confidence: 2 },
      { id: 'HO-02-03-02-00', confidence: 1 },
    ]);
    expect(sorted.slice(0, 3)).toEqual([made, tro, upToCode]);
    expect(forms).toEqual([broad, search, tro, made, upToCode]);
  });
  test('broad-only responses preserve order, and sibling codes do not count as specific matches', () => {
    const generic = form('Generic housing', ['HO-00-00-00-00']);
    const sibling = form('Eviction court case', ['HO-02-03-02-00']);
    const lockout = { title: 'Lockout', tags: ['Housing', 'HO-02-08-00-00'] };
    expect(
      rankFormsByTopics(
        [generic, sibling, lockout],
        [{ id: 'HO-00-00-00-00', confidence: 2 }]
      )
    ).toEqual([generic, sibling, lockout]);
    expect(
      rankFormsByTopics(
        [generic, sibling, lockout],
        [{ id: 'HO-02-08-00-00', confidence: 1 }]
      )
    ).toEqual([lockout, generic, sibling]);
  });
});
