import angular from 'angular';
import '@uirouter/angularjs';

import connectionDetailsComponent from './connection-details.component';
import flags from './flags';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceConnectionDetailsComponent';

angular
  .module(moduleName, [
    'ui.router',
    flags,
  ])
  .component('ovhManagerEnterpriseCloudDatabaseServiceConnectionDetailsComponent', connectionDetailsComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
