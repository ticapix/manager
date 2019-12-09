import component from './pack-move.component';
import routing from './pack-move.routing';

angular.module('managerApp')
  .config(routing)
  .component('packMove', component)
  .run(/* @ngTranslationsInject:json ./translations */);
