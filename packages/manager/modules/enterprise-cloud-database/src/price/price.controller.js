import {
  ASIATOUCH, DEUTCHTOUCH, FRENCHTOUCH, USTOUCH,
} from './price.constants';

export default class EnterpriseCloudDatabasePriceCtrl {
  /* @ngInject */
  constructor() {
    this.ASIATOUCH = ASIATOUCH;
    this.DEUTCHTOUCH = DEUTCHTOUCH;
    this.FRENCHTOUCH = FRENCHTOUCH;
    this.USTOUCH = USTOUCH;
  }

  $onInit() {
    this.ovhSubsidiary = this.user.ovhSubsidiary;
  }

  getPriceText(priceInCents) {
    return `${this.user.currency.symbol}${priceInCents / 100000000}`;
  }
}
