angular.module('managerApp').config(
  /* @ngInject */ ($stateProvider) => {
    $stateProvider.state('telecom.packs.pack.xdsl.modem.templates', {
      url: '/template',
      views: {
        'modemView@telecom.packs.pack.xdsl.modem': {
          templateUrl:
            'app/telecom/pack/xdsl/modem/templates/config/pack-xdsl-modem-templates-config.html',
          controller: 'XdslModemTemplateConfigCtrl',
          controllerAs: '$ctrl',
        },
      },
      translations: { value: ['.'], format: 'json' },
      params: {
        templates: null,
      },
    });
  },
);
