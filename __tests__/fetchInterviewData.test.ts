import { extractLocalizedFees } from '../src/data/fetchInterviewData';

describe('extractLocalizedFees', () => {
  const locale = 'en';

  it('parses array of strings into Fee objects', () => {
    const input = ['Filing fee: 0.00'];
    const res = extractLocalizedFees(input, locale);
    expect(res).toEqual([{ name: 'Filing fee', amount: 0 }]);
  });

  it('parses array of objects with name/amount into Fee objects', () => {
    const input = [{ name: 'Filing fee', amount: 0 }];
    const res = extractLocalizedFees(input as any, locale);
    expect(res).toEqual([{ name: 'Filing fee', amount: 0 }]);
  });

  it('parses array of objects with key -> amount into Fee objects', () => {
    const input = [{ 'Filing fee': 0 }];
    const res = extractLocalizedFees(input as any, locale);
    expect(res).toEqual([{ name: 'Filing fee', amount: 0 }]);
  });

  it('parses localized wrapper with array', () => {
    const input = { en: ['Filing fee: 0.00'] };
    const res = extractLocalizedFees(input as any, locale);
    expect(res).toEqual([{ name: 'Filing fee', amount: 0 }]);
  });

  it('parses object mapping name->amount', () => {
    const input = { 'Filing fee': 0.0 };
    const res = extractLocalizedFees(input as any, locale);
    expect(res).toEqual([{ name: 'Filing fee', amount: 0 }]);
  });

  it('parses single string fee', () => {
    const input = 'Filing fee: 0.00';
    const res = extractLocalizedFees(input as any, locale);
    expect(res).toEqual([{ name: 'Filing fee', amount: 0 }]);
  });

  it('parses strings without amount', () => {
    const input = ['No filing fee'];
    const res = extractLocalizedFees(input, locale);
    expect(res).toEqual([{ name: 'No filing fee', amount: 0 }]);
  });

  it('parses strings with currency into float', () => {
    const input = ['Filing fee: $25.00'];
    const res = extractLocalizedFees(input, locale);
    expect(res).toEqual([{ name: 'Filing fee', amount: 25 }]);
  });
});
