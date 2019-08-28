import angular from 'angular';
import 'font-awesome/css/font-awesome.css';

import deleteCluster from './delete';
import create from './create';
import enterpriseCloudDatabaseComponent from './enterprise-cloud-database.component';
import enterpriseCloudDatabaseService from './enterprise-cloud-database.service';
import routing from './enterprise-cloud-database.routing';
import service from './service';
import mockData from './mock-data';

const moduleName = 'ovhManagerEnterpriseCloudDatabase';

angular
  .module(moduleName, [
    deleteCluster,
    create,
    service,
  ])
  .config(routing)
  .component('enterpriseCloudDatabaseComponent', enterpriseCloudDatabaseComponent)
  .service('enterpriseCloudDatabaseService', enterpriseCloudDatabaseService)
  .service('mockData', mockData)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
