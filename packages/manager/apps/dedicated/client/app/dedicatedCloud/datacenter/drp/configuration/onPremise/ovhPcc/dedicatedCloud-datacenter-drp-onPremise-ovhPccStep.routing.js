import { DEDICATEDCLOUD_DATACENTER_DRP_OPTIONS } from '../../../dedicatedCloud-datacenter-drp.constants';

import legacyTemplate from '../../../../../../ip/ip/legacyOrder/ip-ip-legacyOrder.html';
import template from '../../../../../../ip/ip/agoraOrder/ip-ip-agoraOrder.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('app.dedicatedClouds.datacenter.drp.onPremise.ovhPccStep', {
      url: '/ovhPcc',
      views: {
        'innerView@app.dedicatedClouds.datacenter.drp': {
          component: 'dedicatedCloudDatacenterDrpOnPremiseOvhPccStep',
        },
      },
      params: {
        currentStep: 1,
        drpInformations: {
          drpType: DEDICATEDCLOUD_DATACENTER_DRP_OPTIONS.onPremise,
        },
      },
      resolve: {
        datacenterId: /* @ngInject */ ($transition$) =>
          $transition$.params().datacenterId,
        defaultLocalVraNetwork: /* @ngInject */ (
          $transition$,
          currentService,
          dedicatedCloudDrp,
          drpInformations,
        ) =>
          drpInformations.localVraNetwork === undefined
            ? dedicatedCloudDrp.getDefaultLocalVraNetwork({
                datacenterId: $transition$.params().datacenterId,
                serviceName: currentService.serviceName,
              })
            : null,
        drpInformations: /* @ngInject */ ($transition$) =>
          $transition$.params().drpInformations,
        goBackToChoice: /* @ngInject */ ($state) => (selectedDrpType) =>
          $state.go('app.dedicatedClouds.datacenter.drp', { selectedDrpType }),
        goToNextStep: /* @ngInject */ ($state) => (drpInformations) =>
          $state.go(
            'app.dedicatedClouds.datacenter.drp.onPremise.onPremisePccStep',
            { drpInformations },
          ),
        ipAddressDetails: /* @ngInject */ (currentService, dedicatedCloudDrp) =>
          dedicatedCloudDrp.getPccIpAddressesDetails(
            currentService.serviceName,
          ),
      },
    })
    .state(
      'app.dedicatedClouds.datacenter.drp.onPremise.ovhPccStep.legacyOrderIp',
      {
        controller: 'IpLegacyOrderCtrl',
        template: legacyTemplate,
        layout: 'modal',
        translations: { value: ['.'], format: 'json' },
      },
    )
    .state('app.dedicatedClouds.datacenter.drp.onPremise.ovhPccStep.orderIp', {
      controller: 'agoraIpOrderCtrl',
      template,
      layout: 'modal',
      translations: { value: ['.'], format: 'json' },
    });
};
