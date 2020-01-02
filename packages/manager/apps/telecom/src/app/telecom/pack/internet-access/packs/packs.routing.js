import { ListLayoutHelper } from '@ovh-ux/ng-ovh-telecom-universe-components';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('telecom.packs.internet-access.packs', {
    url: `?${ListLayoutHelper.urlQueryParams}`,
    params: ListLayoutHelper.stateParams,
    component: 'telecomPackInternetAccessPacks',
    resolve: {
      apiPath: () => '/pack/xdsl',
      ...ListLayoutHelper.stateResolves,
      loadResource: /* @ngInject */ (OvhApiPackXdsl) => (resource) =>
        OvhApiPackXdsl.Access()
          .v6()
          .getServices({
            packId: resource.packName,
          })
          .$promise.then((services) => ({
            ...resource,
            numServices: services.length,
          }))
          .catch(() => resource),
      getPackLink: /* @ngInject */ ($state) => ({ packName }) =>
        $state.href('telecom.packs.pack', {
          packName,
        }),
      viewPack: /* @ngInject */ ($state) => ({ packName }) =>
        $state.go('telecom.packs.pack', {
          packName,
        }),
    },
  });
};
