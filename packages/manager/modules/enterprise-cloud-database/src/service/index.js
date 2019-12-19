import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'enterpriseCloudDatabaseService';

angular.module(moduleName, [
  'oc.lazyLoad',
  'ui.router',
]).config(/* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.**', {
    url: '/service',
    lazyLoad: ($transition$) => {
      const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

      return import('./service.module')
        .then((mod) => $ocLazyLoad.inject(mod.default || mod));
    },
  });
});

export default moduleName;
