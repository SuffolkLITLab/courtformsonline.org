import {
  extractLocalizedFees,
  normalizeEfilingEnabled,
} from '../src/data/fetchInterviewData';

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

describe('normalizeEfilingEnabled', () => {
  it('uses efiling_enabled when integrated keys are not present', () => {
    expect(normalizeEfilingEnabled({ efiling_enabled: true } as any)).toBe(
      true
    );
    expect(normalizeEfilingEnabled({ efiling_enabled: 'email' } as any)).toBe(
      'email'
    );
  });

  it('prefers integrated keys over efiling_enabled when both are present', () => {
    expect(
      normalizeEfilingEnabled({
        efiling_enabled: true,
        integrated_email_filing: true,
      } as any)
    ).toBe('email');
    expect(
      normalizeEfilingEnabled({
        efiling_enabled: 'email',
        integrated_efiling: true,
      } as any)
    ).toBe(true);
  });

  it('maps integrated_email_filing to email', () => {
    expect(
      normalizeEfilingEnabled({ integrated_email_filing: true } as any)
    ).toBe('email');
  });

  it('maps integrated_efiling to true', () => {
    expect(normalizeEfilingEnabled({ integrated_efiling: true } as any)).toBe(
      true
    );
  });

  it('maps explicit integrated false values to false', () => {
    expect(normalizeEfilingEnabled({ integrated_efiling: false } as any)).toBe(
      false
    );
    expect(
      normalizeEfilingEnabled({ integrated_email_filing: false } as any)
    ).toBe(false);
  });

  it('returns undefined when nothing is set', () => {
    expect(normalizeEfilingEnabled(undefined)).toBeUndefined();
    expect(normalizeEfilingEnabled({} as any)).toBeUndefined();
  });
});
