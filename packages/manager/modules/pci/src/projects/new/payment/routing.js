import component from './component';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('pci.projects.new.payment', {
      url: '/payment',
      views: {
        '': {
          component: component.name,
        },
        'progress@pci.projects.new.payment': {
          component: 'pciProjectNewProgress',
        },
        'payment@pci.projects.new.payment': {
          componentProvider: (defaultPaymentMethod) => defaultPaymentMethod 
            ? 'pciProjectNewPaymentDefault' 
            : 'pciProjectNewPaymentRegister',
        },
        'voucher@pci.projects.new.payment': {
          component: 'pciProjectNewVoucher',
        },
        'dlp@pci.projects.new.payment': {
          componentProvider: (dlpStatus) => dlpStatus
            ? 'pciProjectNewPaymentDlp' 
            : null,
        },
      },
      resolve: {
        defaultPaymentMethod: /* @ngInject */ (
          ovhPaymentMethod,
        ) => ovhPaymentMethod.getDefaultPaymentMethod(),

        dlpStatus: /* @ngInject */ (pciProjectNewPayment) => pciProjectNewPayment.getDlpStatus()
          .catch((error) => {
            if (error.status === 404) {
              return null;
            }
            return $q.reject(error);
          }),
      },
    });
};