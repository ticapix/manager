import angular from 'angular';
import listComponent from './list.component';

const moduleName = 'ovhManagerListComponent';

angular
  .module(moduleName, [])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('adp.list', {
      url: '/list',
      component: 'listComponent',
      translations: {
        value: [
          '.',
        ],
        format: 'json',
      },
    });
  })
  .component('listComponent', listComponent);

export default moduleName;
