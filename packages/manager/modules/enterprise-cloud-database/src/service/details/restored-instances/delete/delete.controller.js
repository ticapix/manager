import get from 'lodash/get';

export default class EnterpriseCloudDatabaseDeleteCtrl {
  /* @ngInject */
  constructor(
    $stateParams,
    $translate,
    enterpriseCloudDatabaseService,
  ) {
    this.clusterId = $stateParams.clusterId;
    this.instanceId = $stateParams.instanceId;
    this.$translate = $translate;
    this.service = enterpriseCloudDatabaseService;
    this.isLoading = false;
  }

  deleteInstance() {
    this.isLoading = true;
    return this.service.deleteRestoredInstance(this.clusterId, this.instanceId)
      .then(res => this.goBack(
        this.$translate.instant('enterprise_cloud_database_restored_instance_delete_success',
          { instanceId: this.instanceId }),
        'success',
        res.id,
      ))
      .catch(error => this.goBack(
        this.$translate.instant('enterprise_cloud_database_restored_instance_delete_error', {
          message: get(error, 'data.message'),
        }),
        'error',
      ))
      .finally(() => { this.isLoading = false; });
  }
}
