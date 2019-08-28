import angular from 'angular';

import addReplicas from '../../add-replicas';
import deleteReplicas from './delete';
import enterpriseCloudDatabaseServiceDetailsClusterSizeComponent from './cluster-size.component';
import routing from './cluster-size.routing';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsClusterSize';

angular
  .module(moduleName, [
    addReplicas,
    deleteReplicas,
  ])
  .config(routing)
  .component('enterpriseCloudDatabaseServiceDetailsClusterSizeComponent', enterpriseCloudDatabaseServiceDetailsClusterSizeComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
