import get from 'lodash/get';
import find from 'lodash/find';
import set from 'lodash/set';

import component from './component';

import PciEligibility from './classes/eligibility.class';
import PciVoucher from './components/voucher/voucher.class';

export default /* @ngInject */ ($stateProvider, ovhFeatureFlippingProvider) => {
  if (ovhFeatureFlippingProvider.isFeatureActive('pci.onboarding.new')) {
    $stateProvider
      .state('pci.projects.new', {
        url: '/new?cartId&voucher',
        redirectTo: (transition) => transition.router.stateService.target(
          'pci.projects.new.config', transition.params(), {
            location: false,
          },
        ),
        onEnter: /* @ngInject */ ($transition$, $window) => {
          const cartPromise = $transition$.injector().getAsync('cart');
          return cartPromise.then(({ cartId }) => {
            if (cartId !== get($transition$.params(), 'cartId')) {
              $window.location.replace($transition$.router.stateService.href('pci.projects.new', {
                cartId,
              }));
            }
          });
        },
        views: {
          '@pci': component.name,
        },
        resolve: {
          breadcrumb: () => null,

          cart: /* @ngInject */ (
            $transition$,
            me,
            pciProjectNew,
          ) => pciProjectNew.getOrderCart(me.ovhSubsidiary, get($transition$.params(), 'cartId')),

          eligibility: /* @ngInject */ ($transition$, pciProjectNew) => pciProjectNew
            .checkEligibility(get($transition$.params(), 'voucher'))
            .then((eligibility) => new PciEligibility(eligibility)),

          checkVoucherValidity: /* @ngInject */ (pciProjectNew) => (voucher) => pciProjectNew
            .checkEligibility(voucher)
            .catch((error) => ({
              voucher: {
                error: error.status,
              },
            })),

          model: /* @ngInject */ (
            cart,
            checkVoucherValidity,
            eligibility,
          ) => {
            const modelDef = {
              agreements: false,
              credit: null,
              challenge: null,
              description: get(cart, 'projectItem.descriptionConfiguration.value', null),
              paymentMethod: null,
              voucher: new PciVoucher({
                value: get(cart, 'projectItem.voucherConfiguration.value'),
              }),
            };

            if (modelDef.voucher.value) {
              return checkVoucherValidity(modelDef.voucher.value)
                .then((eligibilityOpts) => {
                  // update eligibility instance
                  eligibility.setOptions(eligibilityOpts);
                  // set some information to voucher model
                  modelDef.voucher.setInfos(eligibilityOpts.voucher);
                  // return the model
                  return modelDef;
                });
            }

            return modelDef;
          },

          getStep: /* @ngInject */ (steps) => (name) => find(steps, { name }),

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
  }
};
