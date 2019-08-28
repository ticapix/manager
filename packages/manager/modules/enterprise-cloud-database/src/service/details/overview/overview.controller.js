import { ENTERPRISE_CLOUD_DATABASE_STATUS_MAP } from '../../../enterprise-cloud-database.constants';
import { INCLUDED_CLUSTER_SIZE } from '../details.constants';
import { AUTO_SNAPSHOT, SNAPSHOT_FREQUENCY, SNAPSHOT_RETENTION } from './overview.constants';

export default class EnterpriseCloudDatabaseServiceDetailsOverviewCtrl {
  /* @ngInject */
  constructor(
    $scope,
    $state,
  ) {
    this.$scope = $scope;
    this.$state = $state;
    this.AUTO_SNAPSHOT = AUTO_SNAPSHOT;
    this.INCLUDED_CLUSTER_SIZE = INCLUDED_CLUSTER_SIZE;
    this.ENTERPRISE_CLOUD_DATABASE_STATUS_MAP = ENTERPRISE_CLOUD_DATABASE_STATUS_MAP;
    this.SNAPSHOT_FREQUENCY = SNAPSHOT_FREQUENCY;
    this.SNAPSHOT_RETENTION = SNAPSHOT_RETENTION;
  }

  updatePassword(clusterId) {
    return this.$state.go('enterprise-cloud-database.service.details.overview.update-password', {
      clusterId,
    });
  }
}
