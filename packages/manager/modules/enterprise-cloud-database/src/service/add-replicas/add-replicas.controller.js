import head from 'lodash/head';
import map from 'lodash/map';
import range from 'lodash/range';

import { MAX_CLUSTER_SIZE } from '../details/details.constants';

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
    const orderableReplicaCount = MAX_CLUSTER_SIZE - this.hostList.length;
    this.replicaCounts = map(range(1, orderableReplicaCount + 1), replicaNumber => ({
      replicaNumber,
      text: `${replicaNumber} ${(replicaNumber > 1
        ? this.$translate.instant('enterprise_cloud_database_common_replicas')
        : this.$translate.instant('enterprise_cloud_database_common_replica'))}
         - 59.99 € HT/mois`,
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
}
