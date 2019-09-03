import head from 'lodash/head';

export default class EnterpriseCloudDatabaseCreateCtrl {
  /* @ngInject */

  $onInit() {
    console.log('capabilities', this.capabilities);
    const defaultCluster = head(this.capabilities);
    this.enterpriceDb = {
      database: null,
      datacenter: null,
      cluster: defaultCluster,
      commitmentPeriod: null,
      paymentType: null,
    };
  }
}
