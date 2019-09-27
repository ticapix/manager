import angular from 'angular';
import 'font-awesome/css/font-awesome.css';

import billingInfoComponent from './billing-info';
import create from './create';
import enterpriseCloudDatabaseComponent from './enterprise-cloud-database.component';
import enterpriseCloudDatabaseService from './enterprise-cloud-database.service';
import mockData from './mock-data';
import priceComponent from './price';
import routing from './enterprise-cloud-database.routing';
import service from './service';

const moduleName = 'enterpriseCloudDatabase';

angular
  .module(moduleName, [
    billingInfoComponent,
    create,
    priceComponent,
    service,
  ])
  .config(routing)
  .component('enterpriseCloudDatabaseComponent', enterpriseCloudDatabaseComponent)
  .service('enterpriseCloudDatabaseService', enterpriseCloudDatabaseService)
  .service('mockData', mockData)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
