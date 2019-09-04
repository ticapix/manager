import angular from 'angular';
import '@uirouter/angularjs';
import grantAdpAccessComponent from './grant-access.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsLogsGrantAccess';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.service.details.logs.grant-access', {
      url: '/grant-access',
      views: {
        modal: {
          component: 'ovhManagerEnterpriseCloudDatabaseServiceDetailsLogsGrantAccessComponent',
        },
      },
      layout: 'modal',
    });
  })
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsLogsGrantAccessComponent', grantAdpAccessComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
