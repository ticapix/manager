import angular from 'angular';

import '@ovh-ux/manager-core';
import '@ovh-ux/manager-telecom-styles';
import 'angularjs-scroll-glue';

import '@ovh-ux/ng-ovh-telecom-universe-components';
import '@ovh-ux/ng-ui-router-title';
import '@ovh-ux/ng-tail-logs';
import 'ovh-angular-responsive-tabs';
import 'ovh-angular-ui-confirm-modal';

import 'ovh-ui-kit/dist/oui.css';
import 'ovh-ui-kit-bs/dist/ovh-ui-kit-bs.css';
import 'ovh-manager-webfont/dist/css/ovh-font.css';

import constant from './overTheBox.constant';
import controller from './overTheBox.controller';
import template from './overTheBox.html';

import configure from './configure';
import details from './details';
import docs from './docs';
import logs from './logs';
import order from './order';
import remote from './remote';
import tasks from './tasks';

import './overTheBox.scss';

const moduleName = 'OvhManagerOverTheBoxComponent';

angular
  .module(moduleName, [
    'ovh-angular-responsive-tabs',
    'ngTailLogs',
    'ngOvhTelecomUniverseComponents',
    'ngUiRouterTitle',
    'ovh-angular-ui-confirm-modal',
    configure,
    details,
    docs,
    logs,
    order,
    remote,
    tasks,
  ])
  .config(($stateProvider) => {
    $stateProvider.state('overTheBoxes.overTheBox', {
      url: '/:serviceName',
      abstract: true,
      component: 'ovhManagerOverTheBoxComponent',
      translations: {
        value: ['.', './details', './warning', './remote'],
        format: 'json',
      },
      resolve: {
        $title(translations, $translate, $stateParams, OvhApiOverTheBox) {
          return OvhApiOverTheBox.v6()
            .get({
              serviceName: $stateParams.serviceName,
            })
            .$promise.then((data) =>
              $translate.instant(
                'overTheBox_page_title',
                { name: data.customerDescription || $stateParams.serviceName },
                null,
                null,
                'escape',
              ),
            )
            .catch(() =>
              $translate('overTheBox_page_title', {
                name: $stateParams.serviceName,
              }),
            );
        },
      },
    });
  })
  .component('ovhManagerOverTheBoxComponent', {
    template,
    controller,
    controllerAs: 'OverTheBox',
  })
  .constant('OVER_THE_BOX', constant)
  .constant('PAGINATION_PER_PAGE', 5);

export default moduleName;
