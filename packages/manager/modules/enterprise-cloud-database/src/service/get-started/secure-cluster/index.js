import angular from 'angular';
import '@uirouter/angularjs';

import ruleComponent from '../../rule';
import secureClusterComponent from './secure-cluster.component';
import securityGroupNameComponent from '../../security-group-name';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceGetStartedSecureClusterComponent';

angular
  .module(moduleName, [
    ruleComponent,
    securityGroupNameComponent,
    'ui.router',
  ])
  .component('ovhManagerEnterpriseCloudDatabaseServiceGetStartedSecureClusterComponent', secureClusterComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
