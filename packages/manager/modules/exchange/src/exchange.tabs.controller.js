import find from 'lodash/find';
import includes from 'lodash/includes';
import kebabCase from 'lodash/kebabCase';

export default class ExchangeTabsCtrl {
  /* @ngInject */
  constructor(
    $scope,
    $location,
    Exchange,
    $translate,
    messaging,
    navigation,
    exchangeVersion,
    exchangeServiceInfrastructure,
  ) {
    this.services = {
      $scope,
      $location,
      Exchange,
      $translate,
      messaging,
      navigation,
      exchangeVersion,
      exchangeServiceInfrastructure,
    };

    const $routerParams = Exchange.getParams();

    $scope.services = this.services;
    $scope.kebabCase = (text) => kebabCase(text);
    $scope.changeTab = (tab) => this.changeTab(tab);

    Exchange.updateValue().then(() => {
      if (Exchange.value.serverDiagnostic.individual2010) {
        this.defaultTab = 'ACCOUNT';
        this.tabs = ['ACCOUNT'];
        this.selectedTab = 'ACCOUNT';
        this.dropdownMenuItems = null;
      } else {
        this.defaultTab = 'INFORMATION';
        this.tabs = [
          'INFORMATION',
          'DOMAIN',
          'ACCOUNT',
          'GROUP',
          'EXTERNAL_CONTACT',
        ];

        if (this.services.exchangeVersion.isAfter(2010)) {
          this.tabs.push('SHARED_ACCOUNT');
        }

        this.tabs.push('DIAGNOSTIC');
        this.selectedTab = 'INFORMATION';
        this.dropdownMenuItems = {
          title: $translate.instant('navigation_more'),
          items: [
            {
              label: $translate.instant('exchange_tab_RESOURCES'),
              target: 'RESOURCE',
              type: 'SWITCH_TABS',
            },
            {
              label: $translate.instant('exchange_tab_DISCLAIMER'),
              target: 'DISCLAIMER',
              type: 'SWITCH_TABS',
            },
          ],
        };

        if (
          (this.services.exchangeServiceInfrastructure.isDedicated() ||
            this.services.exchangeServiceInfrastructure.isDedicatedCluster()) &&
          this.services.exchangeVersion.isVersion(2010)
        ) {
          this.dropdownMenuItems.items.push({
            label: $translate.instant('exchange_tab_SHARED'),
            target: 'SHARED',
            type: 'SWITCH_TABS',
          });
        }

        this.dropdownMenuItems.items.push(
          {
            label: $translate.instant('exchange_tab_TASKS'),
            target: 'TASK',
            type: 'SWITCH_TABS',
          },
          {
            type: 'SEPARATOR',
          },
          {
            label: $translate.instant('exchange_action_configuration'),
            type: 'ACTION',
            fn: () => {
              navigation.setAction('exchange/configure/service-configure');
            },
          },
        );
      }

      if (
        $routerParams.tab &&
        this.tabs.indexOf($routerParams.tab.toUpperCase())
      ) {
        this.selectedTab = $routerParams.tab.toUpperCase();
      }

      this.updateScope();
      this.changeTab(this.selectedTab);
    });
  }

  updateScope() {
    this.services.$scope.tabs = this.tabs;
    this.services.$scope.dropdownMenuItems = this.dropdownMenuItems;
    this.services.$scope.selectedTab = this.selectedTab;
  }

  changeTab(tab) {
    const upperCaseSelectedTab = tab.toUpperCase();
    const tabHasAName = upperCaseSelectedTab != null;
    const tabExists = includes(this.tabs, upperCaseSelectedTab);
    const tabIsMenuItem =
      this.dropdownMenuItems != null &&
      find(
        this.dropdownMenuItems.items,
        (item) => item.target === upperCaseSelectedTab,
      );

    if (tabHasAName && (tabExists || tabIsMenuItem)) {
      this.selectedTab = upperCaseSelectedTab;
    } else {
      this.selectedTab = this.defaultTab;
    }

    this.services.$location.search('tab', this.selectedTab);
    this.updateScope();
  }
}
