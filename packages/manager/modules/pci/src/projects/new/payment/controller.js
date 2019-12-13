import get from 'lodash/get';

import { PCI_REDIRECT_URLS } from '../../../constants';

export default class PciProjectNewPaymentCtrl {
  /* @ngInject */
  constructor(
    coreConfig,
    OVH_PAYMENT_METHOD_INTEGRATION_TYPE,
    OVH_PAYMENT_METHOD_TYPE,
  ) {
    this.OVH_PAYMENT_METHOD_INTEGRATION_TYPE = OVH_PAYMENT_METHOD_INTEGRATION_TYPE;
    this.OVH_PAYMENT_METHOD_TYPE = OVH_PAYMENT_METHOD_TYPE;

    // other attributes
    this.paymentMethodUrl = get(PCI_REDIRECT_URLS, `${coreConfig.getRegion()}.paymentMethods`);
  }
}
