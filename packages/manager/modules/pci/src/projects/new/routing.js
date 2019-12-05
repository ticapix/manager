import component from './component';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('pci.projects.new', {
      url: '/new',
      redirectTo: (transition) => transition.router.stateService.target(
        'pci.projects.new.config', {}, {
          location: false,
        },
      ),
      views: {
        '@pci': {
          component: component.name,
        },
      },
      resolve: {
        steps: () => [{
          name: 'configuration',
        }, {
          name: 'payment',
        }],
      },
    });
};