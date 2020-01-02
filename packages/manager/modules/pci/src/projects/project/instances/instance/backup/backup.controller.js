import get from 'lodash/get';

export default class PciInstanceBackupController {
  /* @ngInject */
  constructor(
    $filter,
    $translate,
    CucCloudMessage,
    PciProjectsProjectInstanceService,
  ) {
    this.$filter = $filter;
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
    this.PciProjectsProjectInstanceService = PciProjectsProjectInstanceService;
  }

  $onInit() {
    this.backup = {
      name: `${this.instance.name} ${this.$filter('date')(
        new Date(),
        'short',
      )}`,
    };
    this.isLoading = false;
  }

  createBackup() {
    this.isLoading = true;
    return this.PciProjectsProjectInstanceService.createBackup(
      this.projectId,
      this.instance,
      this.backup,
    )
      .then(() =>
        this.goBack(
          this.$translate.instant(
            'pci_projects_project_instances_instance_backup_success_message',
            {
              backup: this.backup.name,
            },
          ),
        ),
      )
      .catch((err) =>
        this.goBack(
          this.$translate.instant(
            'pci_projects_project_instances_instance_backup_error_backup',
            {
              message: get(err, 'data.message', null),
              backup: this.backup.name,
            },
          ),
          'error',
        ),
      )
      .finally(() => {
        this.isLoading = false;
      });
  }
}
