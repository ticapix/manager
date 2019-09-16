import {
  ASIATOUCH, GERMANTOUCH, FRENCHTOUCH, USTOUCH,
} from './price.constants';

export default class EnterpriseCloudDatabasePriceCtrl {
  /* @ngInject */
  constructor() {
    this.ASIATOUCH = ASIATOUCH;
    this.GERMANTOUCH = GERMANTOUCH;
    this.FRENCHTOUCH = FRENCHTOUCH;
    this.USTOUCH = USTOUCH;
  }

  $onInit() {
    this.ovhSubsidiary = this.user.ovhSubsidiary;
    console.log(this.user);
  }

  getPriceText(priceInCents) {
    return `${this.user.currency.symbol}${priceInCents / 100000000}`;
  }
}
