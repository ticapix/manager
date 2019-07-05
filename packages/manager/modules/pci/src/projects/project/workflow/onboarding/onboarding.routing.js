export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('pci.projects.project.workflow.onboarding', {
      url: '/onboarding',
      component: 'pciProjectWorkflowOnboarding',
      redirectTo: transition => transition
        .injector()
        .getAsync('workflows')
        .then(workflow => (workflow.length > 0 ? { state: 'pci.projects.project.workflow' } : false)),
      resolve: {
        breadcrumb: () => null, // Hide breadcrumb
      },
    });
};
