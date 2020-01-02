export default class TelecomBillingAccountService {
  /* @ngInject */
  constructor($state) {
    this.$state = $state;
  }

  static getServiceState(
    billingAccount,
    { featureType, serviceName, serviceType },
  ) {
    const statePrefix = 'telecom.telephony.billingAccount.';
    let state = `${statePrefix}line`;

    if (['alias'].includes(serviceType)) {
      state = `${statePrefix}alias`;
    } else if (['fax', 'voicefax'].includes(featureType)) {
      state = `${statePrefix}fax`;
    } else if (['carrierSip'].includes(featureType)) {
      state = `${statePrefix}carrierSip`;
    }

    return {
      state,
      stateParams: {
        billingAccount,
        serviceName,
      },
    };
  }

  getServiceLink(billingAccount, { featureType, serviceName, serviceType }) {
    const { state, stateParams } = this.constructor.getServiceState(
      billingAccount,
      {
        featureType,
        serviceName,
        serviceType,
      },
    );
    return this.$state.href(state, stateParams);
  }
}
