import constant from '../telecom-dashboard.constant';

export default class TelecomdashboardBillsController {
  /* @ngInject */
  constructor(
    OvhApiMeBillIceberg,
    TucToastError,
  ) {
    this.OvhApiMeBillIceberg = OvhApiMeBillIceberg;
    this.TucToastError = TucToastError;
  }

  $onInit() {
    this.links = {
      billing: constant.billing,
    };
    this.amountBillsDisplayed = 6;
    this.getLastBills();
  }

  getLastBills() {
    return this.OvhApiMeBillIceberg
      .query()
      .expand('CachedObjectList-Pages')
      .sort('date', 'DESC')
      .limit(6)
      .execute(null, true)
      .$promise
      .then(({ data: bills }) => {
        this.lastBills = bills;
      })
      .catch((err) => {
        this.lastBills = [];
        return this.TucToastError(err);
      });
  }
}
