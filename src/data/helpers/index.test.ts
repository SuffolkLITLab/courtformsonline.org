import { findClosestTopic } from './';

describe('findClosestTopic', () => {
  const legalTopics = [
    {
      name: 'Housing',
      codes: ['HO-01-00-00-00', 'HO-02-00-00-00'],
    },
    {
      name: 'Family',
      codes: ['FA-00-00-00-00', 'FA-01-00-00-00'],
    },
    {
      name: 'Employment',
      codes: ['EM-01-00-00-00'],
    },
  ];

  it('should return the exact matching topic', () => {
    const topicCode = 'HO-02-00-00-00';
    const result = findClosestTopic(topicCode, legalTopics);
    expect(result.name).toBe('Housing');
  });

  it('should return the closest smaller match if exact match is not available', () => {
    const topicCode = 'HO-01-50-00-00';
    const result = findClosestTopic(topicCode, legalTopics);
    expect(result.name).toBe('Housing');
  });

  it('should return undefined if no prefix matches', () => {
    const topicCode = 'XX-01-00-00-00';
    const result = findClosestTopic(topicCode, legalTopics);
    expect(result).toBeUndefined();
  });

  it('handles cases with leading zeros in topic codes', () => {
    const topicCode = 'FA-01-00-00-00';
    const result = findClosestTopic(topicCode, legalTopics);
    expect(result.name).toBe('Family');
  });
});
