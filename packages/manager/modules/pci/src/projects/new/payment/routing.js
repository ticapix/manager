import component from './component';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('pci.projects.new.payment', {
    url: '/payment?paymentStatus',
    views: {
      '': component.name,

      'progress@pci.projects.new.payment': 'pciProjectNewProgress',

      'payment@pci.projects.new.payment': {
        componentProvider: /* @ngInject */ (defaultPaymentMethod) =>
          defaultPaymentMethod
            ? 'pciProjectNewPaymentDefault'
            : 'pciProjectNewPaymentRegister',
      },

      'credits@pci.projects.new.payment': 'pciProjectNewPaymentCredit',

      'challenge@pci.projects.new.payment': {
        componentProvider: /* @ngInject */ (eligibility) =>
          eligibility.isChallengePaymentMethodRequired()
            ? 'pciProjectNewPaymentChallenge'
            : 'pciProjectNewPaymentChallenge',
      },

      'voucher@pci.projects.new.payment': 'pciProjectNewVoucher',

      'dlp@pci.projects.new.payment': {
        componentProvider: /* @ngInject */ (dlpStatus) =>
          dlpStatus ? 'pciProjectNewPaymentDlp' : null,
      },
    },
    onEnter: /* @ngInject */ (activeStep, step) => {
      activeStep(step.name);
    },
    resolve: {
      defaultPaymentMethod: /* @ngInject */ (ovhPaymentMethod) =>
        ovhPaymentMethod.getDefaultPaymentMethod(),

      registerablePaymentMethods: /* @ngInject */ (
        eligibility,
        ovhPaymentMethod,
      ) => ovhPaymentMethod.getAllAvailablePaymentMethodTypes(),

      dlpStatus: /* @ngInject */ ($q, pciProjectNewPayment) =>
        pciProjectNewPayment.getDlpStatus().catch((error) => {
          if (error.status === 404) {
            return null;
          }
          return $q.reject(error);
        }),

      getCancelHref: /* @ngInject */ ($state) => () =>
        $state.href('pci.projects'),

      reloadPayment: /* @ngInject */ ($state) => () =>
        $state.go(
          'pci.projects.new.payment',
          {},
          {
            reload: true,
          },
        ),

      onCartFinalized: /* @ngInject */ ($state, $window, cart) => ({
        orderId,
        url,
      }) => {
        if (cart.creditOption) {
          // if credit has been added - redirect to order url
          return $window.location.assign(url);
        }

        return $state.go('pci.projects.creating', {
          orderId,
        });
      },

      step: /* @ngInject */ (getStep) => getStep('payment'),
    },
  });
};
