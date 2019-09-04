export default class EnterpriseCloudDatabaseDefaultPaymentCtrl {
  /* @ngInject */
  $onInit() {
    this.onChangeValue = true;
    if (this.defaultPayment) {
      this.paymentDetails = `${this.defaultPayment.description} ${this.defaultPayment.number}`;
    }
  }
}
