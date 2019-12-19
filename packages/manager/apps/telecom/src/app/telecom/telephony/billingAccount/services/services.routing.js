import get from 'lodash/get';
import { ListLayoutHelper } from '@ovh-ux/ng-ovh-telecom-universe-components';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('telecom.telephony.billingAccount.services', {
    url: `/services?${ListLayoutHelper.urlQueryParams}`,
    views: {
      'groupInnerView@telecom.telephony.billingAccount': {
        component: 'telecomTelephonyBillingAccountServices',
      },
    },
    params: ListLayoutHelper.stateParams,
    resolve: {
      ...ListLayoutHelper.stateResolves,
      apiPath: /* @ngInject */ (billingAccountId) => `/telephony/${billingAccountId}/service`,
      schema: /* @ngInject */ (OvhApiTelephony) => OvhApiTelephony
        .v6()
        .schema()
        .$promise,
      telephonyFeatureTypes: /* @ngInject */ (schema) => get(schema.models, 'telephony.TypeEnum').enum,
      telephonyServiceTypes: /* @ngInject */ (schema) => get(schema.models, 'telephony.TypeServiceEnum').enum,
      getServiceLink: /* @ngInject */ (
        billingAccountId,
        telecomBillingAccount,
      ) => (service) => telecomBillingAccount
        .getServiceLink(billingAccountId, service),

      viewService: /* @ngInject */ (
        $state,
        billingAccountId,
        telecomBillingAccount,
      ) => (service) => {
        const { state, stateParams } = telecomBillingAccount
          .constructor
          .getServiceState(billingAccountId, service);
        return $state.go(state, stateParams);
      },

    },
  });
};
