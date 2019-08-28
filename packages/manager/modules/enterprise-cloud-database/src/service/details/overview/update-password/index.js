import angular from 'angular';
import '@uirouter/angularjs';
import updatePasswordComponent from './update-password.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsOverviewUpdatePassword';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.service.details.overview.update-password', {
      url: '/update-password',
      params: {
        clusterId: null,
      },
      views: {
        modal: {
          component: 'updatePasswordComponent',
        },
      },
      layout: 'modal',
    });
  })
  .component('updatePasswordComponent', updatePasswordComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
