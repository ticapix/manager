import angular from 'angular';

import details from './details';
import getStarted from './get-started';
import defaultPayment from './default-payment';
import enterpriseCloudDatabaseServiceComponent from './service.component';
import routing from './service.routing';
import password from './password';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseService';

angular
  .module(moduleName, [
    defaultPayment,
    details,
    getStarted,
    password,
  ])
  .config(routing)
  .component('enterpriseCloudDatabaseServiceComponent', enterpriseCloudDatabaseServiceComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
