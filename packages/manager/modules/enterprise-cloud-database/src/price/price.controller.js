export default class EnterpriseCloudDatabasePriceCtrl {
  /* @ngInject */
  constructor(
    enterpriseCloudDatabaseService,
  ) {
    this.service = enterpriseCloudDatabaseService;
    this.frenchTouch = ['CZ', 'ES', 'FR', 'GB', 'IE', 'IT', 'LT', 'MA', 'NL', 'PL', 'PT', 'TN'];
    this.deutchTouch = ['DE', 'FI', 'SN'];
    this.usTouch = ['CA', 'WE', 'WS', 'QC', 'US'];
    this.asiaTouch = ['SG', 'ASIA', 'AU'];
  }

  $onInit() {
    this.priceWithTaxText = this.service.getPriceText(this.price.price + this.price.tax);
    this.priceWithoutTaxText = this.service.getPriceText(this.price.price);
  }
}
