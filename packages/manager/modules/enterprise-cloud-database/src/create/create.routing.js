export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.create', {
    component: 'enterpriseCloudDatabaseCreateComponent',
    url: '/create',
    resolve: {
      catalog: /* @ngInject */ enterpriseCloudDatabaseService => enterpriseCloudDatabaseService
        .getCatalog(),
      breadcrumb: /* @ngInject */ $translate => $translate.instant('enterprise_cloud_database_create_title'),
    },
  });
};
