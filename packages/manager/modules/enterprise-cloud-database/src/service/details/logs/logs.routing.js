import { STATUS } from '../../../enterprise-cloud-database.constants';

export default /* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.logs', {
    component: 'enterpriseCloudDatabaseServiceDetailsLogsComponent',
    url: '/logs',
    translations: {
      value: ['.'],
      format: 'json',
    },
    resolve: {
      logs: /* @ngInject */ (
        clusterId,
        enterpriseCloudDatabaseService,
      ) => enterpriseCloudDatabaseService
        .getLogs(clusterId),
      grantAccess: /* @ngInject */ ($state, clusterId) => () => {
        $state.go('enterprise-cloud-database.service.details.logs.grant-access', {
          clusterId,
        });
      },
      revokeAccess: /* @ngInject */ ($state, clusterId) => (ldpAccount) => {
        $state.go('enterprise-cloud-database.service.details.logs.revoke-access', {
          clusterId,
          ldpAccount,
          logId: ldpAccount.id,
        });
      },
      goBackToLogs: /* @ngInject */ ($state, CucCloudMessage) => (message = false,
        type = STATUS.SUCCESS) => {
        const reload = message && type === STATUS.SUCCESS;
        const state = 'enterprise-cloud-database.service.details.logs';
        const promise = $state.go(state, {}, { reload });
        if (message) {
          promise.then(() => {
            CucCloudMessage[type](message, state);
          });
        }
        return promise;
      },
      breadcrumb: /* @ngInject */ $translate => $translate.instant('enterprise_cloud_database_service_details_logs'),
    },
  });
};
