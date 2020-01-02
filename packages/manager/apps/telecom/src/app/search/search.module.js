import angular from 'angular';
import ngOvhApiWrappers from '@ovh-ux/ng-ovh-api-wrappers';
import routing from './search.routing';

import telecomSearchResults from './results/results.component';

const moduleName = 'ovhManagerTelecomSearch';

angular
  .module(moduleName, [ngOvhApiWrappers])
  .config(routing)
  .component('telecomSearchResults', telecomSearchResults);

export default moduleName;
