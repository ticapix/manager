import get from 'lodash/get';

import { ELIGIBILITY_ACTION_ENUM } from '../constants';
import { PCI_REDIRECT_URLS } from '../../../constants';

export default class PciProjectNewPaymentCtrl {
  /* @ngInject */
  constructor(
    $translate,
    $window,
    coreConfig,
    CucCloudMessage,
    pciProjectNew,
    OVH_PAYMENT_METHOD_INTEGRATION_TYPE,
    OVH_PAYMENT_METHOD_TYPE,
  ) {
    this.$translate = $translate;
    this.$window = $window;
    this.CucCloudMessage = CucCloudMessage;
    this.pciProjectNew = pciProjectNew;
    this.OVH_PAYMENT_METHOD_INTEGRATION_TYPE = OVH_PAYMENT_METHOD_INTEGRATION_TYPE;
    this.OVH_PAYMENT_METHOD_TYPE = OVH_PAYMENT_METHOD_TYPE;

    // other attributes
    this.paymentMethodUrl = get(PCI_REDIRECT_URLS, `${coreConfig.getRegion()}.paymentMethodAdd`);
    this.integrationSubmitFn = null;

    this.message = {
      handler: null,
      list: null,
    };

    this.onIntegrationSubmit = PciProjectNewPaymentCtrl.onIntegrationSubmit;
  }

  /* ==============================
  =            Helpers            =
  =============================== */

  refreshMessages() {
    this.message.list = this.message.handler.getMessages();
  }

  manageProjectCreation() {
    let infraConfigPromise = Promise.resolve(true);
    let creditPromise = Promise.resolve(true);

    if (!this.cart.projectItem.infrastructureConfiguration) {
      infraConfigPromise = this.pciProjectNew.setCartProjectItemInfrastructure(this.cart);
    }

    if (this.model.paymentMethod
      && this.model.paymentMethod.paymentType === 'CREDIT'
      && this.model.credit && !this.cart.creditOption) {
      creditPromise = this.pciProjectNew.setCartProjectItemCredit(
        this.cart,
        this.model.credit.value,
      );
    }

    return Promise.all([
      infraConfigPromise,
      creditPromise,
    ])
      .then(() => this.pciProjectNew.finalizeCart(this.cart))
      .then((order) => {
        if (this.cart.creditOption) {
          // if credit has been added - redirect to order url
          return this.$window.location.assign(order.url);
        }

        return order;
      })
      .catch(() => {
        this.CucCloudMessage.error(
          this.$translate.instant('pci_project_new_payment_checkout_error'),
          'pci.projects.new.payment',
        );
      });
  }

  /* -----  End of Helpers  ------ */


  /* =============================
  =            Events            =
  ============================== */

  onPaymentFormSubmit() {
    // call integration submit function if some
    if (this.eligibility.actionsRequired.includes(ELIGIBILITY_ACTION_ENUM.ADD_PAYMENT_MEHTOD)
      && this.integrationSubmitFn) {
      return this.integrationSubmitFn();
    }

    const challengeRequired = this.eligibility
      .actionsRequired.includes(ELIGIBILITY_ACTION_ENUM.CHALLENGE_PAYMENT_METHOD);

    if (challengeRequired) {
      // TODO
    }

    return this.manageProjectCreation();
  }

  /* -----  End of Events  ------ */

  /* ================================
  =            Callbacks            =
  ================================= */

  onIntegrationInitialized(integrationSubmitFn) {
    this.integrationSubmitFn = integrationSubmitFn;
  }

  static onIntegrationSubmit() {
    return {
      default: true,
      register: true,
    };
  }

  onIntegrationSubmitSuccess() {
    return this.manageProjectCreation();
  }

  onIntegrationSubmitError() {
    this.CucCloudMessage.error(
      this.$translate.instant('pci_project_new_payment_create_error'),
      'pci.projects.new.payment',
    );
  }

  /* -----  End of Callbacks  ------ */

  /* ============================
  =            Hooks            =
  ============================= */

  $onInit() {
    this.message.handler = this.CucCloudMessage.subscribe('pci.projects.new.payment', {
      onMessage: () => this.refreshMessages(),
    });
  }

  /* -----  End of Hooks  ------ */
}
