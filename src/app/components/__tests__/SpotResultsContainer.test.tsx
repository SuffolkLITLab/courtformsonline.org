import { render, screen } from '@testing-library/react';
import SpotResultsContainer from '../SpotResultsContainer';
import { legalTopics } from '../../../config/topics.config';

it('keeps search-result links in the selected state', () => {
  const family = legalTopics.find((topic) => topic.name === 'family');
  render(
    <SpotResultsContainer
      path="wv"
      searchQuery="caring for my grandchild"
      onCancel={() => {}}
      data={{ labels: [{ id: family.codes[0], pred: 0.9 }] }}
      interviews={{
        family: [
          {
            filename: 'docassemble.KinshipConnector:data/questions/kin.yml',
            metadata: { title: 'Kinship Connector' },
          },
        ],
      }}
    />
  );
  expect(
    screen.getByRole('link', { name: 'Kinship Connector' }).getAttribute('href')
  ).toBe('/wv/forms/kinship-connector');
});
