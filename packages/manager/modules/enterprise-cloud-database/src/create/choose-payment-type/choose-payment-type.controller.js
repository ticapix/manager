export default class {
  $onInit() {
    this.selectedPaymentType = this.enterpriceDb.paymentType;
  }

  onPaymentTypeSelect(paymentType) {
    this.selectedPaymentType = paymentType;
    this.enterpriceDb.paymentType = paymentType;
  }
}
