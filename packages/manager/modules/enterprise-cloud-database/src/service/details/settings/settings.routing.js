export default /* @ngInject */($stateProvider) => {
  $stateProvider
    .state('enterprise-cloud-database.service.details.settings', {
      cache: false,
      component: 'enterpriseCloudDatabaseServiceDetailsSettingsComponent',
      resolve: {
        addRule: /* @ngInject */ ($state, clusterId) => securityGroup => $state.go(
          'enterprise-cloud-database.service.details.settings.add-rule',
          { clusterId, securityGroup },
        ),
        createSecurityGroup: /* @ngInject */ ($state, clusterId) => () => $state.go(
          'enterprise-cloud-database.service.details.settings.create-security-group',
          { clusterId },
        ),
        deleteRule: /* @ngInject */ ($state, clusterId) => (securityGroup, rule) => $state.go(
          'enterprise-cloud-database.service.details.settings.delete-rule',
          { clusterId, securityGroup, rule },
        ),
        deleteSecurityGroup: /* @ngInject */ ($state, clusterId) => securityGroup => $state.go(
          'enterprise-cloud-database.service.details.settings.delete-security-group',
          { clusterId, securityGroup },
        ),
        editSecurityGroup: /* @ngInject */ ($state, clusterId) => securityGroup => $state.go(
          'enterprise-cloud-database.service.details.settings.edit-security-group',
          { clusterId, securityGroup },
        ),
        maintenanceWindow: /* @ngInject */
          ($q, clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
            .getMaintenanceWindow(clusterId)
            .catch(error => ((error.status === 404) ? null : $q.reject(error))),
      },
      translations: {
        value: ['.'],
        format: 'json',
      },
      url: '/settings',
    });
};
