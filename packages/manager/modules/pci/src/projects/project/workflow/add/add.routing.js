import map from 'lodash/map';
import Instance from '../../../../components/project/instance/instance.class';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('pci.projects.project.workflow.new', {
      url: '/new',
      component: 'ovhManagerPciProjectWorkflowAdd',
      params: {
        selectedInstance: null,
      },
      redirectTo: transition => transition
        .injector()
        .getAsync('instances')
        .then(instances => (instances.length === 0 ? { state: 'pci.projects.project.instances' } : false)),
      resolve: {
        selectedInstance: /* @ngInject */ $stateParams => $stateParams.selectedInstance,
        instances: /* @ngInject */ (
          OvhApiCloudProjectInstance,
          projectId,
        ) => OvhApiCloudProjectInstance.v6().query({
          serviceName: projectId,
        }).$promise
          .then(instances => map(instances, instance => new Instance(instance))),

        breadcrumb: /* @ngInject */ $translate => $translate.instant('pci_workflow_add'),
      },
    });
};
