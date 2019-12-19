import controller from './hosting.controller';
import template from './hosting.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.hosting', {
    url: '/configuration/hosting/:productId?tab',
    template,
    controller,
    controllerAs: '$ctrl',
    reloadOnSearch: false,
    params: {
      tab: null,
    },
    resolve: {
      goToHosting: /* @ngInject */ ($state, $timeout, Alerter) => (message = false, type = 'success') => {
        const promise = $state.go('app.hosting', {});

        if (message) {
          promise.then(() => $timeout(() => Alerter.set(`alert-${type}`, message, null, 'app.alerts.main')));
        }

        return promise;
      },
      navigationInformations: /* @ngInject */ (Navigator, $rootScope) => {
        $rootScope.currentSectionInformation = 'hosting'; // eslint-disable-line no-param-reassign
        return Navigator.setNavigationInformation({
          leftMenuVisible: true,
          configurationSelected: true,
        });
      },
    },
    translations: { value: ['.'], format: 'json' },
  });

  $stateProvider.state('app.hosting.upgrade', {
    url: '/change-offer',
    templateUrl: 'hosting/offer/upgrade/hosting-offer-upgrade.html',
    controller: 'HostingUpgradeOfferCtrl',
    reloadOnSearch: false,
    translations: ['.'],
  });
};
