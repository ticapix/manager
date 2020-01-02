angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state('telecom.packs.pack.domain-activation', {
    url: '/domain/activation',
    views: {
      'packView@telecom.packs': {
        templateUrl:
          'app/telecom/pack/slots/domain/activation/pack-domain-activation.html',
        controller: 'PackDomainActivationController',
        controllerAs: 'PackDomainActivation',
      },
    },
    translations: { value: ['.'], format: 'json' },
  });
});
