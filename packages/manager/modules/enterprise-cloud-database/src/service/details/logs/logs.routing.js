export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.logs', {
    component: 'enterpriseCloudDatabaseServiceDetailsLogsComponent',
    translations: {
      value: ['.'],
      format: 'json',
    },
    url: '/logs',
  });
};
