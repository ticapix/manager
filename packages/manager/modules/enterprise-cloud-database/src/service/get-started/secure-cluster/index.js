import angular from 'angular';
import '@uirouter/angularjs';
import secureClusterComponent from './secure-cluster.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceGetStartedSecureClusterComponent';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .component('ovhManagerEnterpriseCloudDatabaseServiceGetStartedSecureClusterComponent', secureClusterComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
