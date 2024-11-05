const { getTopicNames } = require('../src/data/helpers/index');

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

  // Match the import path used in getTopicNames
  jest.mock('../src/config/topics.config', () => ({
    legalTopics,
  }));

  it('should return the exact matching topic', () => {
    const topicCodes = ['HO-02-00-00-00'];
    const result = getTopicNames(topicCodes);
    expect(result).toEqual(['housing']);
  });
});
