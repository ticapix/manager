import { MESSAGE_CONTAINER } from '../details.constants';

export default /* @ngInject */($stateProvider) => {
  $stateProvider
    .state('enterprise-cloud-database.service.details.settings', {
      cache: false,
      component: 'enterpriseCloudDatabaseServiceDetailsSettingsComponent',
      resolve: {
        addRule: /* @ngInject */ ($state, clusterId) => securityGroup => $state.go(
          'enterprise-cloud-database.service.details.settings.add-rule',
          { clusterId, securityGroup },
        ),
        createSecurityGroup: /* @ngInject */ ($state, clusterId) => () => $state.go(
          'enterprise-cloud-database.service.details.settings.create-security-group',
          { clusterId },
        ),
        deleteRule: /* @ngInject */ ($state, clusterId) => (securityGroup, rule) => $state.go(
          'enterprise-cloud-database.service.details.settings.delete-rule',
          { clusterId, securityGroup, rule },
        ),
        deleteSecurityGroup: /* @ngInject */ ($state, clusterId) => securityGroup => $state.go(
          'enterprise-cloud-database.service.details.settings.delete-security-group',
          { clusterId, securityGroup },
        ),
        editSecurityGroup: /* @ngInject */ ($state, clusterId) => securityGroup => $state.go(
          'enterprise-cloud-database.service.details.settings.edit-security-group',
          { clusterId, securityGroup },
        ),
        maintenanceWindow: /* @ngInject */
          ($q, clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
            .getMaintenanceWindow(clusterId)
            .catch(error => ((error.status === 404) ? null : $q.reject(error))),
        securityGroups: /* @ngInject */
          (clusterId, enterpriseCloudDatabaseService) => enterpriseCloudDatabaseService
            .getSecurityGroupList(clusterId),
      },
      translations: {
        value: ['.'],
        format: 'json',
      },
      url: '/settings',
    })
    .state('enterprise-cloud-database.service.details.settings.create-security-group', {
      layout: 'modal',
      resolve: {
        goBack: /* @ngInject */ ($state, clusterId, CucCloudMessage) => (message = false, type = 'success') => {
          const reload = message && type === 'success';
          const state = 'enterprise-cloud-database.service.details.settings';
          const promise = $state.go(state, { clusterId }, { reload });
          if (message) {
            promise.then(() => CucCloudMessage[type](message, MESSAGE_CONTAINER));
          }
          return promise;
        },
      },
      url: '/create-security-group',
      views: {
        modal: {
          component: 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsCreateSecurityGroupComponent',
        },
      },
    })
    .state('enterprise-cloud-database.service.details.settings.delete-security-group', {
      layout: 'modal',
      params: {
        securityGroup: null,
      },
      resolve: {
        goBack: /* @ngInject */ ($state, clusterId, CucCloudMessage) => (message = false, type = 'success') => {
          const reload = message && type === 'success';
          const state = 'enterprise-cloud-database.service.details.settings';
          const promise = $state.go(state, { clusterId }, { reload });
          if (message) {
            promise.then(() => CucCloudMessage[type](message, MESSAGE_CONTAINER));
          }
          return promise;
        },
        securityGroup: /* @ngInject */ $transition$ => $transition$.params().securityGroup,
      },
      url: '/delete-security-group',
      views: {
        modal: {
          component: 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsDeleteSecurityGroupComponent',
        },
      },
    })
    .state('enterprise-cloud-database.service.details.settings.edit-security-group', {
      layout: 'modal',
      params: {
        securityGroup: null,
      },
      resolve: {
        goBack: /* @ngInject */ ($state, clusterId, CucCloudMessage) => (message = false, type = 'success') => {
          const reload = message && type === 'success';
          const state = 'enterprise-cloud-database.service.details.settings';
          const promise = $state.go(state, { clusterId }, { reload });
          if (message) {
            promise.then(() => CucCloudMessage[type](message, MESSAGE_CONTAINER));
          }
          return promise;
        },
        securityGroup: /* @ngInject */ $transition$ => $transition$.params().securityGroup,
      },
      url: '/edit-security-group',
      views: {
        modal: {
          component: 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsEditSecurityGroupComponent',
        },
      },
    })
    .state('enterprise-cloud-database.service.details.settings.add-rule', {
      layout: 'modal',
      params: {
        securityGroup: null,
      },
      resolve: {
        goBack: /* @ngInject */ ($state, clusterId, CucCloudMessage) => (message = false, type = 'success') => {
          const reload = message && type === 'success';
          const state = 'enterprise-cloud-database.service.details.settings';
          const promise = $state.go(state, { clusterId }, { reload });
          if (message) {
            promise.then(() => CucCloudMessage[type](message, MESSAGE_CONTAINER));
          }
          return promise;
        },
        securityGroup: /* @ngInject */ $transition$ => $transition$.params().securityGroup,
      },
      url: '/add-rule',
      views: {
        modal: {
          component: 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsCreateRuleComponent',
        },
      },
    })
    .state('enterprise-cloud-database.service.details.settings.delete-rule', {
      layout: 'modal',
      params: {
        securityGroup: null,
        rule: null,
      },
      resolve: {
        goBack: /* @ngInject */ ($state, clusterId, CucCloudMessage) => (message = false, type = 'success') => {
          const reload = message && type === 'success';
          const state = 'enterprise-cloud-database.service.details.settings';
          const promise = $state.go(state, { clusterId }, { reload });
          if (message) {
            promise.then(() => CucCloudMessage[type](message, MESSAGE_CONTAINER));
          }
          return promise;
        },
        securityGroup: /* @ngInject */ $transition$ => $transition$.params().securityGroup,
        rule: /* @ngInject */ $transition$ => $transition$.params().rule,
      },
      url: '/delete-rule',
      views: {
        modal: {
          component: 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsDeleteRuleComponent',
        },
      },
    });
};
