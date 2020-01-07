import get from 'lodash/get';

import {
  ORDER_STATUS_ENUM,
  SLIDE_ANIMATION_INTERVAL,
  SLIDE_IMAGES,
} from './constants';

export default class PciProjectCreatingCtrl {
  /* @ngInject */
  constructor($q, $timeout, pciProjectCreating, Poller) {
    // dependencies injections
    this.$q = $q;
    this.$timeout = $timeout;
    this.pciProjectCreating = pciProjectCreating;
    this.Poller = Poller;

    // other attributes
    this.pollingNamespace = 'pci.projects.order';

    this.imageSlider = {
      currentIndex: 0,
      list: SLIDE_IMAGES,
    };
  }

  getDeliveredProjectId() {
    return this.pciProjectCreating
      .getOrderDetails(this.orderId)
      .then((details) => get(details, '[0].domain'));
  }

  /* ==============================
  =            Polling            =
  =============================== */

  startOrderStatusPolling() {
    return this.Poller.poll(`/me/order/${this.orderId}/status`, null, {
      namespace: this.pollingNamespace,
      successRule(status) {
        return status === ORDER_STATUS_ENUM.DELIVERED;
      },
    })
      .then(() => this.getDeliveredProjectId())
      .then((projectId) => this.onProjectDelivered(projectId));
  }

  stopOrderStatusPolling() {
    return this.Poller.kill({
      namespace: this.pollingNamespace,
    });
  }

  /* -----  End of Polling  ------ */

  /* ===================================
  =            Image slider            =
  ==================================== */

  slideImages() {
    return this.$timeout(() => {
      if (this.imageSlider.currentIndex >= this.imageSlider.list.length - 1) {
        this.imageSlider.currentIndex = 0;
      } else {
        this.imageSlider.currentIndex += 1;
      }
      return this.slideImages();
    }, SLIDE_ANIMATION_INTERVAL);
  }

  /* -----  End of Image slider  ------ */

  /* ============================
  =            Hooks            =
  ============================= */

  $onInit() {
    this.slideImages();
    this.startOrderStatusPolling();
  }

  $onDestroy() {
    return this.stopOrderStatusPolling();
  }

  /* -----  End of Hooks  ------ */
}
