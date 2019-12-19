import find from 'lodash/find';
import map from 'lodash/map';

import { VALID_PAYMENTMEAN } from './quota.constants';

export default class {
  /* @ngInject */
  constructor(OvhApiMe) {
    this.OvhApiMe = OvhApiMe;
  }

  getDefaultPaymentMean(region) {
    if (region !== 'US') {
      return this.OvhApiMe.PaymentMean().v6().getDefaultPaymentMean();
    }

    return this.OvhApiMe.PaymentMethod().v6().query({
      status: VALID_PAYMENTMEAN,
    }).$promise.then((paymentMethodIds) => map(
      paymentMethodIds,
      (paymentMethodId) => Promise.all(
        this.OvhApiMe.PaymentMethod().v6().get({
          id: paymentMethodId,
        }).$promise,
      ),
    )).then((paymentMethods) => find(paymentMethods, {
      default: true,
    }));
  }
}
