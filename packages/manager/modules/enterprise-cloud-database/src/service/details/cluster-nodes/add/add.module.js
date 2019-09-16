import angular from 'angular';
import '@uirouter/angularjs';

import addComponent from '../../../add-replicas';
import routing from './add.routing';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsClusterSizeAdd';

angular
  .module(moduleName, [
    'ui.router',
    addComponent,
  ])
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
