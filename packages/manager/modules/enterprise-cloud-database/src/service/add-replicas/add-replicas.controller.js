import get from 'lodash/get';
import head from 'lodash/head';
import map from 'lodash/map';
import range from 'lodash/range';

export default class EnterpriseCloudDatabaseServiceAddReplicasCtrl {
  /* @ngInject */
  constructor(
    $translate,
    enterpriseCloudDatabaseService,
  ) {
    this.$translate = $translate;
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
  }

  $onInit() {
    const orderableReplicaCount = this.maxHostCount - this.hostList.length;
    const replicaCost = get(head(this.nodeCatalog.pricings), 'price') / 100000000;
    this.replicaCounts = map(range(1, orderableReplicaCount + 1), replicaNumber => ({
      replicaNumber,
      text: `${replicaNumber} ${(replicaNumber > 1
        ? this.$translate.instant('enterprise_cloud_database_common_replicas')
        : this.$translate.instant('enterprise_cloud_database_common_replica'))}
         - ${this.$translate.instant('enterprise_cloud_database_service_add_replicas_price', {
        price: replicaCost * replicaNumber,
        currency: this.enterpriseCloudDatabaseService.userData.currencySymbol,
      })}`,
    }));
    this.data = {
      selectedReplicaCount: head(this.replicaCounts),
      useDefaultPaymentMethod: true,
    };
  }

  saveData() {
    const data = {
      replicaCount: this.data.selectedReplicaCount.replicaNumber,
      useDefaultPaymentMethod: Boolean(this.data.useDefaultPaymentMethod),
    };
    this.callback(data);
    this.goBack();
  }

  defaultPaymentChange(defaultPaymentCheck) {
    this.defaultPaymentCheck = defaultPaymentCheck;
  }
}
