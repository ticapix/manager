import find from 'lodash/find';
import map from 'lodash/map';
import set from 'lodash/set';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('pci.projects.project.analytics-data-platform.details.cluster', {
    url: '/cluster',
    component: 'clusterComponent',
    resolve: {
      serviceName: /* @ngInject */ $stateParams => $stateParams.serviceName,

      platformDetails: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        serviceName,
      ) => analyticsDataPlatformService.getAnalyticsDataPlatformDetails(serviceName)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_cluster_error')(error)),

      publicCloudDetails: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        projectId,
      ) => analyticsDataPlatformService.getPubliCloudDetails(projectId)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_cluster_info_error')(error)),

      clusterNodes: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        flavors,
        serviceName,
      ) => analyticsDataPlatformService.getClusterNodesDetails(serviceName)
        .then(nodes => map(nodes, (node) => {
          const flavor = find(flavors, { name: node.flavor });
          set(node, 'vcpus', flavor.vcpus);
          set(node, 'ram', flavor.ram);
          return node;
        }))
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_nodes_error')(error)),

      flavors: /* @ngInject */ (
        CucServiceHelper,
        analyticsDataPlatformService,
        platformDetails,
        projectId,
      ) => analyticsDataPlatformService.getFlavors(projectId, platformDetails.osRegion)
        .catch(error => CucServiceHelper.errorHandler('analytics_data_platform_get_flavors_error')(error)),

      breadcrumb: /* @ngInject */ $translate => $translate.instant('analytics_data_platform_service_cluster_breadscrum'),
    },
  });
};
