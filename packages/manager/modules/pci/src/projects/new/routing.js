import get from 'lodash/get';
import find from 'lodash/find';
import set from 'lodash/set';

import component from './component';

import PciVoucher from './components/voucher/voucher.class';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('pci.projects.new', {
      url: '/new?voucher',
      redirectTo: transition => transition.router.stateService.target(
        'pci.projects.new.config', transition.params(), {
          location: false,
        },
      ),
      views: {
        '@pci': component.name,
      },
      resolve: {
        breadcrumb: () => null,

        eligibility: /* @ngInject */ pciProjectNew => pciProjectNew
          .checkEligibility(),

        checkVoucherValidity: /* @ngInject */ pciProjectNew => voucher => pciProjectNew
          .checkEligibility(voucher)
          .catch(error => ({
            voucher: {
              error: error.status,
            },
          })),

        model: /* @ngInject */ ($transition$, checkVoucherValidity) => {
          const modelDef = {
            voucher: new PciVoucher({
              value: get($transition$.params(), 'voucher'),
            }),
            paymentMethod: null,
          };

          if (modelDef.voucher.value) {
            return checkVoucherValidity(modelDef.voucher.value)
              .then(({ voucher }) => {
                // set some information to voucher model
                modelDef.voucher.setInfos(voucher);
                // return the model
                return modelDef;
              });
          }

          return modelDef;
        },

        getStep: /* @ngInject */ steps => name => find(steps, { name }),

        activeStep: /* @ngInject */ (getStep, steps) => (name) => {
          // desactive all steps
          steps.forEach((step) => {
            set(step, 'active', false);
          });

          // active the step with given name
          const activeStep = getStep(name);
          set(activeStep, 'active', true);
        },

        steps: () => [{
          name: 'configuration',
          active: false,
        }, {
          name: 'payment',
          active: false,
        }],
      },
    });
};
