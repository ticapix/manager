import get from 'lodash/get';

import component from './component';

import { GUIDE_URLS } from './constants';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('pci.projects.creating', {
    url: '/creating/:orderId',
    views: {
      '@pci': component.name,
    },
    resolve: {
      breadcrumb: () => null,

      guideUrl: /* @ngInject */ (me) => get(GUIDE_URLS, me.ovhSubsidiary),

      onProjectDelivered: /* @ngInject */ ($state) => (projectId) =>
        $state.go('pci.projects.project', {
          projectId,
        }),

      orderId: /* @ngInject */ ($transition$) => $transition$.params().orderId,

      orderStatus: /* @ngInject */ (orderId, pciProjectCreating) =>
        pciProjectCreating.getOrderStatus(orderId),
    },
  });
};
