export default class PciProjectNewService {
  /* @ngInject */
  constructor(OvhApiCloud) {
    this.OvhApiCloud = OvhApiCloud;
  }

  checkEligibility(voucher) {
    return this.OvhApiCloud.v6()
      .getEligibility({ voucher }).$promise;
  }
}
