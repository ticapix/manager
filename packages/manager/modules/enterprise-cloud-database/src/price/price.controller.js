export default class EnterpriseCloudDatabasePriceCtrl {
  /* @ngInject */
  constructor() {
    this.frenchTouch = ['CZ', 'ES', 'FR', 'GB', 'IE', 'IT', 'LT', 'MA', 'NL', 'PL', 'PT', 'TN'];
    this.deutchTouch = ['DE', 'FI', 'SN'];
    this.usTouch = ['CA', 'WE', 'WS', 'QC', 'US'];
    this.asiaTouch = ['SG', 'ASIA', 'AU'];
  }

  $onInit() {
    this.ovhSubsidiary = this.user.ovhSubsidiary;
  }

  getPriceText(priceInCents) {
    return `${priceInCents / 100000000} ${this.user.currency.symbol}`;
  }
}
