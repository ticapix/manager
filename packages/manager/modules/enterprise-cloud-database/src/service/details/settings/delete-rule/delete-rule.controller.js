import get from 'lodash/get';

export default class EnterpriseCloudDatabaseServiceDetailsSettingsDeleteSecurityGroupCtrl {
  /* @ngInject */
  constructor(
    $translate,
    enterpriseCloudDatabaseService,
  ) {
    this.$translate = $translate;
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
  }

  $onInit() {
    this.loaders = {
      rule: false,
    };
  }

  deleteRule() {
    this.loaders.rule = true;
    this.enterpriseCloudDatabaseService
      .deleteRule(this.clusterId, this.securityGroup.id, this.rule.id)
      .then(() => {
        this.enterpriseCloudDatabaseService.resetSecurityGroupDetailsCache();
        return this.goBack(
          this.$translate.instant('enterprise_cloud_database_service_details_settings_delete_rule_success'),
          'success',
        );
      })
      .catch(error => this.goBack(
        this.$translate.instant('enterprise_cloud_database_service_details_settings_delete_rule_error', {
          message: get(error, 'data.message'),
        }),
        'error',
      ))
      .finally(() => {
        this.loaders.rule = false;
      });
  }
}
