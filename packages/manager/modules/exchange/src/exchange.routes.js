import set from 'lodash/set';

import template from './exchange.html';
import orderTemplate from './order/order.html';

export default /* @ngInject */($stateProvider) => {
  const getNavigationInformations = (currentSectionInformation) => /* @ngInject */(
    Navigator,
    $rootScope,
  ) => {
    set($rootScope, 'currentSectionInformation', currentSectionInformation);
    return Navigator.setNavigationInformation({
      leftMenuVisible: true,
      configurationSelected: true,
    });
  };

  $stateProvider.state('app.microsoft.exchange', {
    abstract: true,
    template: '<div data-ui-view></div>',
    translations: {
      value: ['.'],
      format: 'json',
    },
  });

  $stateProvider.state('app.microsoft.exchange.dedicated', {
    url: '/configuration/exchange_dedicated/:organization/:productId?tab',
    template,
    controller: 'ExchangeCtrl',
    controllerAs: 'ctrl',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      navigationInformations: getNavigationInformations('exchange_dedicated'),
    },
  });

  $stateProvider.state('app.microsoft.exchange.dedicatedCluster', {
    url: '/configuration/exchange_dedicatedCluster/:organization/:productId?tab',
    template,
    controller: 'ExchangeCtrl',
    controllerAs: 'ctrl',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      navigationInformations: getNavigationInformations('exchange_dedicatedCluster'),
    },
  });

  $stateProvider.state('app.microsoft.exchange.hosted', {
    url: '/configuration/exchange_hosted/:organization/:productId?tab',
    template,
    controller: 'ExchangeCtrl',
    controllerAs: 'ctrl',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      navigationInformations: getNavigationInformations('exchange_hosted'),
    },
  });

  $stateProvider.state('app.microsoft.exchange.provider', {
    url: '/configuration/exchange_provider/:organization/:productId?tab',
    template,
    controller: 'ExchangeCtrl',
    controllerAs: 'ctrl',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      navigationInformations: getNavigationInformations('exchange_provider'),
    },
  });

  $stateProvider.state('app.microsoft.exchange.order', {
    url: '/configuration/exchange/order',
    template: orderTemplate,
    controller: 'ExchangeOrderCtrl',
    controllerAs: 'ctrl',
    reloadOnSearch: false,
    resolve: {
      navigationInformations: getNavigationInformations('exchange_order'),
    },
  });
};
