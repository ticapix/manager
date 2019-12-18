import attempt from 'lodash/attempt';
import get from 'lodash/get';
import has from 'lodash/has';
import isError from 'lodash/isError';

import { VOUCHER_CODE_ENUM } from './constants';

export default class PciVoucher {
  constructor(options = {}) {
    // options available from APIs
    this.value = !PciVoucher.isTestCode(options.value) ? options.value : null;
    this.valid = options.valid || false;
    this.paymentMethodRequired = options.paymentMethodRequired || false;
    this.credit = options.credit || null;

    // other options
    this.error = options.error || null;
  }

  /**
   *  Check if a voucher value is a json with testcode
   */
  static isTestCode(value) {
    const isJson = !isError(attempt(JSON.parse, value));

    return isJson ? has(JSON.parse(value), 'testcode') : false;
  }

  /**
   *  As testcode in full JSON format is not accepted by API
   *  parse it and build right testcode voucher value.
   */
  static getVoucherTestCode(value) {
    if (PciVoucher.isTestCode(value)) {
      const { testcode } = JSON.parse(value);
      return `testcode:${JSON.stringify(testcode)}`;
    }

    return null;
  }

  setInfos(infos) {
    // reset before
    this.reset();

    if (infos.error) {
      // set validity
      this.valid = false;
      // set error info
      this.error = {
        status: infos.error,
        statusText: get(VOUCHER_CODE_ENUM, infos.error, 'DEFAULT'),
      };
    } else {
      // set validity
      this.valid = true;
      // set other infos
      Object.assign(this, infos);
    }

    return this;
  }

  reset() {
    this.valid = false;
    this.paymentMethodRequired = false;
    this.credit = null;
    this.error = null;

    return this;
  }
}
