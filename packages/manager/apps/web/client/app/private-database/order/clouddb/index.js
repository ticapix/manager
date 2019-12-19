import component from './private-database-order-clouddb.component';
import routing from './private-database-order-clouddb.routing';
import service from './private-database-order-clouddb.service';

const moduleName = 'ovhManagerWebPrivateDatabaseOrderClouddb';

angular
  .module(moduleName, [])
  .component(component.name, component)
  .service('PrivateDatabaseOrderCloudDb', service)
  .config(routing);

export default moduleName;
