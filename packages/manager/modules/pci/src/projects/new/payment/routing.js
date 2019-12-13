import component from './component';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('pci.projects.new.payment', {
      url: '/payment',
      views: {
        '': component.name,

        'progress@pci.projects.new.payment': 'pciProjectNewProgress',

        'payment@pci.projects.new.payment': {
          componentProvider: defaultPaymentMethod => (defaultPaymentMethod
            ? 'pciProjectNewPaymentDefault'
            : 'pciProjectNewPaymentRegister'),
        },

        'voucher@pci.projects.new.payment': 'pciProjectNewVoucher',

        'dlp@pci.projects.new.payment': {
          componentProvider: dlpStatus => (dlpStatus
            ? 'pciProjectNewPaymentDlp'
            : null),
        },
      },
      onEnter: /* @ngInject */ (activeStep, step) => {
        activeStep(step.name);
      },
      resolve: {
        defaultPaymentMethod: /* @ngInject */ ovhPaymentMethod => ovhPaymentMethod
          .getDefaultPaymentMethod(),

        registerablePaymentMethods: /* @ngInject */ (
          eligibility,
          ovhPaymentMethod,
        ) => ovhPaymentMethod
          .getAllAvailablePaymentMethodTypes(),

        dlpStatus: /* @ngInject */ (
          $q,
          pciProjectNewPayment,
        ) => pciProjectNewPayment.getDlpStatus().catch((error) => {
          if (error.status === 404) {
            return null;
          }
          return $q.reject(error);
        }),

        getCancelHref: /* @ngInject */ $state => () => $state.href('pci.projects'),

        step: /* @ngInject */ getStep => getStep('payment'),
      },
    });
};
