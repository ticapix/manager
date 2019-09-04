export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.create', {
    component: 'enterpriseCloudDatabaseCreateComponent',
    url: '/create',
    resolve: {
      breadcrumb: /* @ngInject */ $translate => $translate.instant('enterprise_cloud_database_create_title'),
      capabilities: /* @ngInject */ enterpriseCloudDatabaseService => enterpriseCloudDatabaseService
        .getOffers(),
    },
  });
};
