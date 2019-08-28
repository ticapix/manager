import angular from 'angular';
import '@uirouter/angularjs';

import flagsComponent from './flags.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceConnectionDetailsFlagsComponent';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .component('ovhManagerEnterpriseCloudDatabaseServiceConnectionDetailsFlagsComponent', flagsComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
