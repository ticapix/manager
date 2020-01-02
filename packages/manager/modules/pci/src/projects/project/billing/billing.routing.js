import controller from './billing.controller';
import template from './billing.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('pci.projects.project.billing', {
    url: '/billing',
    controller,
    controllerAs: 'BillingCtrl',
    redirectTo: (transition) => {
      // Redirect back to project page if the current NIC
      // is not an admin or a billing contact
      const serviceName = transition.params().projectId;
      const $q = transition.injector().get('$q');
      return $q
        .all([
          transition
            .injector()
            .get('OvhApiMe')
            .v6()
            .get().$promise,
          transition
            .injector()
            .get('OvhApiCloudProjectServiceInfos')
            .v6()
            .get({
              serviceName,
            }).$promise,
        ])
        .then(([me, serviceInfo]) =>
          me.nichandle !== serviceInfo.contactAdmin &&
          me.nichandle !== serviceInfo.contactBilling
            ? 'pci.projects.project'
            : false,
        );
    },
    template,
    resolve: {
      breadcrumb: /* @ngInject */ ($translate) =>
        $translate.instant('cpbc_billing_control'),
    },
  });
};
