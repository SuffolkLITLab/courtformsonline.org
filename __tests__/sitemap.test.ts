import sitemap from '../src/app/sitemap';
import { fetchInterviews as realFetchInterviews } from '../src/data/fetchInterviewData';

jest.mock('../src/data/fetchInterviewData', () => ({
  fetchInterviews: jest.fn(),
}));

describe('sitemap generation', () => {
  beforeAll(() => {
    (realFetchInterviews as jest.Mock).mockImplementation(async () => ({
      interviewsByTopic: {
        housing: [
          {
            title: 'My Form',
            metadata: { LIST_topics: ['HO-00-00-00-00'] },
            filename: 'some.yml',
            serverUrl: 'https://example.org',
            link: '/dummy',
          },
        ],
      },
      isError: false,
    }));
  });

  it('returns a sitemap array containing expected paths', async () => {
    const result = await sitemap();

    // Check structure
    expect(Array.isArray(result)).toBe(true);

    // Check content
    const urls = result.map((item) => item.url);
    expect(urls).toContain('https://courtformsonline.org/ma/forms/my-form');
    expect(urls).toContain('https://courtformsonline.org/ma/housing');
    expect(urls).toContain('https://courtformsonline.org/');
  });
});
