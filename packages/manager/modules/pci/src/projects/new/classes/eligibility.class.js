export default class PciEligibility {
  constructor(options = {}) {
    this.voucher = options.voucher;
    this.paymentMethodsAuthorized = options.paymentMethodsAuthorized;
    this.minimumCredit = options.minimumCredit;
    this.actionsRequired = options.actionsRequired;
  }

  setOptions(options = {}) {
    Object.assign(this, options);
  }
}
