import angular from 'angular';

import enterpriseCloudDatabaseServiceDetailsLogsComponent from './logs.component';
import routing from './logs.routing';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsLogs';

angular
  .module(moduleName, [])
  .config(routing)
  .component('enterpriseCloudDatabaseServiceDetailsLogsComponent', enterpriseCloudDatabaseServiceDetailsLogsComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
