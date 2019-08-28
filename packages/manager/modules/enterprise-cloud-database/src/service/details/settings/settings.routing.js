export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.settings', {
    component: 'enterpriseCloudDatabaseServiceDetailsSettingsComponent',
    resolve: {
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
