import angular from 'angular';
import 'font-awesome/css/font-awesome.css';

import enterpriseCloudDatabaseComponent from './enterprise-cloud-database.component';
import enterpriseCloudDatabaseService from './enterprise-cloud-database.service';
import routing from './enterprise-cloud-database.routing';
import create from './create';
import deleteCluster from './delete';
import mockData from './mock-data';
import priceComponent from './price';
import service from './service';

const moduleName = 'ovhManagerEnterpriseCloudDatabase';

angular
  .module(moduleName, [
    create,
    deleteCluster,
    priceComponent,
    service,
  ])
  .config(routing)
  .component('enterpriseCloudDatabaseComponent', enterpriseCloudDatabaseComponent)
  .service('enterpriseCloudDatabaseService', enterpriseCloudDatabaseService)
  .service('mockData', mockData)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
