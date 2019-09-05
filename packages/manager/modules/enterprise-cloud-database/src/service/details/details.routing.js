export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details', {
    abstract: true,
    component: 'enterpriseCloudDatabaseServiceDetailsComponent',
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/details',
  });
};
