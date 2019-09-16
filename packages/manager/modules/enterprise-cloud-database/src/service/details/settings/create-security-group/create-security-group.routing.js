import { MESSAGE_CONTAINER } from '../../details.constants';

export default /* @ngInject */($stateProvider) => {
  $stateProvider
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
      translations: {
        value: ['.'],
        format: 'json',
      },
      url: '/create-security-group',
      views: {
        modal: {
          component: 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsCreateSecurityGroupComponent',
        },
      },
    });
};
