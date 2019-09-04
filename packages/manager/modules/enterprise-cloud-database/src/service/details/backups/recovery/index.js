import angular from 'angular';
import '@uirouter/angularjs';
import recoveryComponent from './recovery.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsBackupsRecovery';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.service.details.backups.recovery', {
      url: '/recovery',
      params: {
        minDate: null,
      },
      views: {
        modal: {
          component: 'recoveryComponent',
        },
      },
      layout: 'modal',
      resolve: {
        minDate: /* @ngInject */ $transition$ => $transition$.params().minDate,
      },
    });
  })
  .component('recoveryComponent', recoveryComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
