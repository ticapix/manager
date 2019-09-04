import angular from 'angular';
import ruleComponent from './rule.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceRule';

angular
  .module(moduleName, [])
  .component('ovhManagerEnterpriseCloudDatabaseServiceRuleComponent', ruleComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
