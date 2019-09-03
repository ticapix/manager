import head from 'lodash/head';

export default class {
  constructor() {
    this.dummy = null;
  }

  $onInit() {
    this.initializeMockData();
  }

  initializeMockData() {
    this.paymentPeriods = [
      {
        id: 'MONTHLY',
        name: 'Monthly',
        save: 0,
      },
      {
        id: 'ONE-TIME',
        name: 'One time',
        save: 100,
      },
    ];
    this.selectedPaymentPeriod = head(this.paymentPeriods);
  }

  onPaymentPeriodSelect(paymentPeriod) {
    this.selectedPaymentPeriod = paymentPeriod;
    this.enterpriceDb.paymentType = paymentPeriod;
  }
}
