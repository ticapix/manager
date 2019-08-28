import angular from 'angular';
import addReplicasComponent from './add-replicas.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceAddReplicas';

angular
  .module(moduleName, [])
  .component('ovhManagerEnterpriseCloudDatabaseServiceAddReplicasComponent', addReplicasComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
