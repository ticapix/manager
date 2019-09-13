import { MESSAGE_CONTAINER } from '../../details.constants';

export default /* @ngInject */($stateProvider) => {
  $stateProvider
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
      translations: {
        value: ['.'],
        format: 'json',
      },
      url: '/delete-rule',
      views: {
        modal: {
          component: 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsDeleteRuleComponent',
        },
      },
    });
};
