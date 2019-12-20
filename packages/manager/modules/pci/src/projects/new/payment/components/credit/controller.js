import head from 'lodash/head';

import { PREDIFINED_AMOUNT_SEQUENCE } from './constants';

export default class PciProjectNewPaymentCreditCtrl {
  constructor() {
    // other attributes
    this.predifinedAmounts = [];
    this.otherAmount = {
      value: null,
      radio: false,
      getterSetter: (...args) => {
        if (args.length) {
          this.otherAmount.value = head(args);
          this.model.credit = PciProjectNewPaymentCreditCtrl.getAmountToPriceFormat(
            this.otherAmount.value,
            this.eligibility.minimumCredit,
          );
        }

        return this.otherAmount.value;
      },
    };
  }

  /* ==============================
  =            Helpers            =
  =============================== */

  static getAmountToPriceFormat(value, { currencyCode, text }) {
    return {
      currencyCode,
      text: text.replace(/\d+(?:[.,]\d+)?/, value),
      value,
    };
  }

  /* -----  End of Helpers  ------ */

  /* =============================
  =            Events            =
  ============================== */

  onPredifinedAmountRadioChange() {
    this.otherAmount.radio = false;
  }

  onOtherAmountRadioChange() {
    this.model.credit = null;
    this.otherAmount.value = null;
  }

  /* -----  End of Events  ------ */

  /* ============================
  =            Hooks            =
  ============================= */

  $onInit() {
    // define predifined amounts
    const minAmount = this.eligibility.minimumCredit;
    this.predifinedAmounts.push(minAmount);
    PREDIFINED_AMOUNT_SEQUENCE.forEach((multiple) => {
      const nextAmount = minAmount.value * multiple;
      this.predifinedAmounts.push(
        PciProjectNewPaymentCreditCtrl.getAmountToPriceFormat(nextAmount, minAmount),
      );
    });
  }

  /* -----  End of Hooks  ------ */
}
