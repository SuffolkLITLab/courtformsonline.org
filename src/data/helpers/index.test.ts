import { getTopicNames } from './';

describe('getTopicNames', () => {
  const legalTopics = [
    {
      name: 'housing',
      codes: ['HO-01-00-00-00', 'HO-02-00-00-00'],
    },
    {
      name: 'family',
      codes: ['FA-00-00-00-00', 'FA-01-00-00-00'],
    },
    {
      name: 'employment',
      codes: ['EM-01-00-00-00'],
    },
  ];

  // Mock the module that provides legalTopics
  jest.mock('../../config/topics.config', () => ({
    legalTopics,
  }));

  it('should return the exact matching topic', () => {
    const topicCodes = ['HO-02-00-00-00'];
    const result = getTopicNames(topicCodes);
    expect(result).toEqual(['housing']);
  });

  it('should return the closest smaller match if exact match is not available', () => {
    const topicCodes = ['HO-01-50-00-00'];
    const result = getTopicNames(topicCodes);
    expect(result).toEqual(['housing']);
  });

  it('should return "other" if no prefix matches', () => {
    const topicCodes = ['XX-01-00-00-00'];
    const result = getTopicNames(topicCodes);
    expect(result).toEqual(['other']);
  });

  it('handles cases with leading zeros in topic codes', () => {
    const topicCodes = ['FA-01-00-00-00'];
    const result = getTopicNames(topicCodes);
    expect(result).toEqual(['family']);
  });
});
