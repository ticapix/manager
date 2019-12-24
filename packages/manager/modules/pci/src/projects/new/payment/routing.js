import component from './component';

import {
  ELIGIBILITY_ACTION_ENUM,
} from '../constants';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('pci.projects.new.payment', {
      url: '/payment?paymentStatus',
      views: {
        '': component.name,

        'progress@pci.projects.new.payment': 'pciProjectNewProgress',

        'payment@pci.projects.new.payment': {
          componentProvider: /* @ngInject */ (defaultPaymentMethod) => (defaultPaymentMethod
            ? 'pciProjectNewPaymentDefault'
            : 'pciProjectNewPaymentRegister'),
        },

        'credits@pci.projects.new.payment': 'pciProjectNewPaymentCredit',

        'challenge@pci.projects.new.payment': {
          componentProvider: /* @ngInject */ (eligibility) => (eligibility
            .actionsRequired.includes(ELIGIBILITY_ACTION_ENUM.CHALLENGE_PAYMENT_METHOD) ? 'pciProjectNewPaymentChallenge' : null),
        },

        'voucher@pci.projects.new.payment': 'pciProjectNewVoucher',

        'dlp@pci.projects.new.payment': {
          componentProvider: /* @ngInject */ (dlpStatus) => (dlpStatus
            ? 'pciProjectNewPaymentDlp'
            : null),
        },
      },
      onEnter: /* @ngInject */ (activeStep, step) => {
        activeStep(step.name);
      },
      resolve: {
        defaultPaymentMethod: /* @ngInject */ (ovhPaymentMethod) => ovhPaymentMethod
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

        getCancelHref: /* @ngInject */ ($state) => () => $state.href('pci.projects'),

        step: /* @ngInject */ (getStep) => getStep('payment'),
      },
    });
};
