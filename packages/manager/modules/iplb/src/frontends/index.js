import IpLoadBalancerDashboardHeaderCtrl from '../header/iplb-dashboard-header.controller';
import IpLoadBalancerFrontendsCtrl from './iplb-frontends.controller';
import IpLoadBalancerFrontendDeleteCtrl from './delete/iplb-frontends-delete.controller';
import IpLoadBalancerFrontendsEditCtrl from './iplb-frontends-edit.controller';
import IpLoadBalancerFrontendPreviewCtrl from './preview/iplb-frontends-preview.controller';
import IpLoadBalancerFrontendsService from './iplb-frontends.service';

import IplbFrontendsEditTemplate from './iplb-frontends-edit.html';
import IplbFrontendsTemplate from './iplb-frontends.html';
import IplbHeaderTemplate from '../header/iplb-dashboard-header.html';

const moduleName = 'ovhManagerIplbFrontends';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider
      .state('network.iplb.detail.frontends', {
        url: '/frontends',
        redirectTo: 'network.iplb.detail.frontends.home',
        views: {
          iplbHeader: {
            template: IplbHeaderTemplate,
            controller: 'IpLoadBalancerDashboardHeaderCtrl',
            controllerAs: 'ctrl',
          },
          iplbContent: {
            template: '<div data-ui-view="iplbFrontend"><div>',
          },
        },
        translations: {
          value: ['.'],
          format: 'json',
        },
      })
      .state('network.iplb.detail.frontends.home', {
        url: '/',
        views: {
          iplbFrontend: {
            template: IplbFrontendsTemplate,
            controller: 'IpLoadBalancerFrontendsCtrl',
            controllerAs: 'ctrl',
          },
        },
        translations: {
          value: ['.'],
          format: 'json',
        },
      })
      .state('network.iplb.detail.frontends.add', {
        url: '/add',
        views: {
          iplbFrontend: {
            template: IplbFrontendsEditTemplate,
            controller: 'IpLoadBalancerFrontendsEditCtrl',
            controllerAs: 'ctrl',
          },
        },
        translations: {
          value: ['.'],
          format: 'json',
        },
      })
      .state('network.iplb.detail.frontends.update', {
        url: '/:frontendId',
        views: {
          iplbFrontend: {
            template: IplbFrontendsEditTemplate,
            controller: 'IpLoadBalancerFrontendsEditCtrl',
            controllerAs: 'ctrl',
          },
        },
        translations: {
          value: ['.'],
          format: 'json',
        },
      });
  })
  .controller('IpLoadBalancerDashboardHeaderCtrl', IpLoadBalancerDashboardHeaderCtrl)
  .controller('IpLoadBalancerFrontendsCtrl', IpLoadBalancerFrontendsCtrl)
  .controller('IpLoadBalancerFrontendsEditCtrl', IpLoadBalancerFrontendsEditCtrl)
  .controller('IpLoadBalancerFrontendPreviewCtrl', IpLoadBalancerFrontendPreviewCtrl)
  .controller('IpLoadBalancerFrontendDeleteCtrl', IpLoadBalancerFrontendDeleteCtrl)
  .service('IpLoadBalancerFrontendsService', IpLoadBalancerFrontendsService)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
