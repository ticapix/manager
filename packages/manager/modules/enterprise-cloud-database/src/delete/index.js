import angular from 'angular';
import '@uirouter/angularjs';
import deleteComponent from './delete.component';

const moduleName = 'enterpriseCloudDatabaseDelete';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('enterprise-cloud-database.delete', {
      url: '/delete?clusterId',
      params: {
        clusterId: null,
        clusterName: null,
      },
      views: {
        modal: {
          component: 'deleteComponent',
        },
      },
      layout: 'modal',
      resolve: {
        goBack: /* @ngInject */  goBackToList => goBackToList,
        clusterName: /* @ngInject */ $transition$ => $transition$.params().clusterName,
      },
    });
  })
  .component('deleteComponent', deleteComponent);

export default moduleName;
