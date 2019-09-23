export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.create', {
    component: 'enterpriseCloudDatabaseCreateComponent',
    url: '/create',
    translations: {
      value: ['.'],
      format: 'json',
    },
    resolve: {
      hasDefaultPaymentMethod: /* @ngInject */
        ovhPaymentMethod => ovhPaymentMethod.hasDefaultPaymentMethod(),
      breadcrumb: /* @ngInject */ $translate => $translate.instant('enterprise_cloud_database_create_title'),
    },
  });
};
