import packMainTemplate from './pack-main.view.html';
import packTemplate from './pack.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('telecom.packs', {
    url: '/pack',
    abstract: true,
    views: {
      'telecomView@telecom': {
        template: packMainTemplate,
      },
    },
  });

  $stateProvider.state('telecom.packs.pack', {
    url: '/:packName',
    views: {
      'packView@telecom.packs': {
        template: packTemplate,
        controller: 'PackCtrl',
        controllerAs: 'Pack',
      },
    },
    resolve: {
      resiliationNotification() {
        return {};
      },
      $title(translations, $translate, OvhApiPackXdsl, $stateParams) {
        return OvhApiPackXdsl.v6()
          .get({
            packId: $stateParams.packName,
          })
          .$promise.then((data) => $translate.instant(
            'pack_xdsl_page_title',
            { name: data.description || $stateParams.packName },
            null,
            null,
            'escape',
          ))
          .catch(() => $translate.instant('pack_xdsl_page_title', {
            name: $stateParams.packName,
          }));
      },
    },
    translations: {
      value: [
        '.',
        './common',
        '../task',
        '../pack/slots/emailPro',
        '../pack/slots/task',
      ],
      format: 'json',
    },
  });
};
