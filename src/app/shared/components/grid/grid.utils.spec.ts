import { GenerateSummeryMessage } from './grid.utils';
import { SummeryType } from './model';

describe('GenerateSummeryMessage', () => {
  it('it should generate correct formats', () => {
    const minutes = {
      message: 'Total',
      summeryType: SummeryType.Minute
    };

    const megaBute = {
      message: 'Total',
      summeryType: SummeryType.MegaByte
    };

    const currency = {
      message: 'Total',
      summeryType: SummeryType.Currency
    };

    const noType = {
      message: 'Total'
    };

    const actualMinutes = GenerateSummeryMessage(minutes);
    const actualMegaBute = GenerateSummeryMessage(megaBute);
    const actualCurrency = GenerateSummeryMessage(currency);
    const actualNoType = GenerateSummeryMessage(noType);

    expect(actualMinutes).toEqual('Total: {0} Min');
    expect(actualMegaBute).toEqual('Total: {0} MB');
    expect(actualCurrency).toEqual('Total: £ {0}');
    expect(actualNoType).toEqual('Total: {0}');
  });
});
