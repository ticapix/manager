import component from './component';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('pci.projects.new.config', {
      url: '/config',
      views: {
        '': {
          component: component.name,
        },
        'progress@pci.projects.new.config': {
          component: 'pciProjectNewProgress',
        },
        'voucher@pci.projects.new.config': {
          component: 'pciProjectNewVoucher',
        },
      },
      
    });
};