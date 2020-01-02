import isNull from 'lodash/isNull';
import kebabCase from 'lodash/kebabCase';
import toUpper from 'lodash/toUpper';

export default /* @ngInject */ (
  $scope,
  $stateParams,
  $location,
  $translate,
) => {
  $scope.kebabCase = kebabCase;

  const defaultTab = 'INFORMATION';
  $scope.tabs = [
    'INFORMATION',
    'DOMAIN',
    'ACCOUNT',
    $scope.exchange.isMXPlan ? 'MAILING_LIST' : null,
    $scope.exchange.isMXPlan ? 'REDIRECTION' : null,
    'EXTERNAL_CONTACT',
  ].filter((tab) => !isNull(tab));

  $scope.tabMenu = {
    title: $translate.instant('navigation_more'),
    items: [
      {
        label: $translate.instant('emailpro_tab_DISCLAIMER'),
        target: 'DISCLAIMER',
        type: 'SWITCH_TABS',
      },
      {
        label: $translate.instant('emailpro_tab_TASKS'),
        target: 'TASK',
        type: 'SWITCH_TABS',
      },
      {
        type: 'SEPARATOR',
      },
      {
        label: $translate.instant('emailpro_configuration_action_title'),
        type: 'ACTION',
        fn() {
          $scope.setAction(
            'emailpro/service/configure/emailpro-service-configure',
            { exchange: $scope.exchange },
          );
        },
        disabled: $scope.is25g(),
      },
    ],
  };

  $scope.setSelectedTab = function setSelectedTab(tab) {
    if (tab !== undefined && tab !== null && tab !== '') {
      $scope.selectedTab = tab;
    } else {
      $scope.selectedTab = defaultTab;
    }

    $location.search('tab', $scope.selectedTab);
  };

  if (
    $stateParams.tab &&
    ~$scope.tabs.indexOf($stateParams.tab.toUpperCase())
  ) {
    $scope.setSelectedTab(toUpper($stateParams.tab));
  } else {
    $scope.setSelectedTab(defaultTab);
  }
};
