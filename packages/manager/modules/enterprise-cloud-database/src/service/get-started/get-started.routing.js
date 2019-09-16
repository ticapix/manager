export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.get-started', {
    component: 'enterpriseCloudDatabaseServiceGetStartedComponent',
    params: {
      data: null,
    },
    resolve: {
      addReplicas: /* @ngInject */ ($state, clusterId, hostList) => callback => $state.go('enterprise-cloud-database.service.get-started.add-replicas', { callback, clusterId, hostList }),
      endPoints: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getEndpointsWithDetails(clusterId),
      hostList: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getHosts(clusterId),
      maintenanceWindow: /* @ngInject */
          ($q, clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
            .getMaintenanceWindow(clusterId)
            .catch(error => ((error.status === 404) ? null : $q.reject(error))),
      securityGroups: /* @ngInject */
        (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
          .getSecurityGroupList(clusterId),
    },
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/get-started',
  });
};
