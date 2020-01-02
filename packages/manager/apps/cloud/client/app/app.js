import get from 'lodash/get';
import has from 'lodash/has';

import uiRouter, { RejectType } from '@uirouter/angularjs';

import { Environment } from '@ovh-ux/manager-config';
import ovhManagerCore from '@ovh-ux/manager-core';
import ngAtInternet from '@ovh-ux/ng-at-internet';
import ngAtInternetUiRouterPlugin from '@ovh-ux/ng-at-internet-ui-router-plugin';
import ngOvhApiWrappers from '@ovh-ux/ng-ovh-api-wrappers';
import ngOvhBrowserAlert from '@ovh-ux/ng-ovh-browser-alert';
import ngOvhChatbot from '@ovh-ux/ng-ovh-chatbot';
import ngOvhCheckboxTable from '@ovh-ux/ng-ovh-checkbox-table';
import ngOvhDocUrl from '@ovh-ux/ng-ovh-doc-url';
import ngOvhFormFlat from '@ovh-ux/ng-ovh-form-flat';
import ngOvhJsplumb from '@ovh-ux/ng-ovh-jsplumb';
import ngOvhResponsiveTabs from '@ovh-ux/ng-ovh-responsive-tabs';
import ngOvhSlider from '@ovh-ux/ng-ovh-slider';
import ngOvhSsoAuth from '@ovh-ux/ng-ovh-sso-auth';
import ngOvhSsoAuthModalPlugin from '@ovh-ux/ng-ovh-sso-auth-modal-plugin';
import ngOvhStopEvent from '@ovh-ux/ng-ovh-stop-event';
import ngOvhSwimmingPoll from '@ovh-ux/ng-ovh-swimming-poll';
import ngOvhToaster from '@ovh-ux/ng-ovh-toaster';
import ngOvhUiRouterLayout from '@ovh-ux/ng-ui-router-layout';
import ngOvhUiRouterLineProgress from '@ovh-ux/ng-ui-router-line-progress';
import ngOvhUserPref from '@ovh-ux/ng-ovh-user-pref';
import ngPaginationFront from '@ovh-ux/ng-pagination-front';
import ngQAllSettled from '@ovh-ux/ng-q-allsettled';
import ngTailLogs from '@ovh-ux/ng-tail-logs';
import ngTranslateAsyncLoader from '@ovh-ux/ng-translate-async-loader';
import ngOvhActionsMenu from '@ovh-ux/ng-ovh-actions-menu';
import ngOvhCloudUniverseComponents from '@ovh-ux/ng-ovh-cloud-universe-components';
import ngOvhJqueryUiDroppable from '@ovh-ux/ng-ovh-jquery-ui-droppable';
import ovhManagerBanner from '@ovh-ux/manager-banner';
import ovhManagerNavbar from '@ovh-ux/manager-navbar';
import ovhManagerServerSidebar from '@ovh-ux/manager-server-sidebar';

import cloudUniverseComponents from '../cloudUniverseComponents';

import errorPage from './error/error.module';

Environment.setRegion(__WEBPACK_REGION__);

angular
  .module('managerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'ngMessages',
    'pascalprecht.translate',
    'ui.bootstrap',
    uiRouter,
    'ui.validate',
    'ui.sortable',
    ovhManagerCore,
    ngAtInternet,
    ngAtInternetUiRouterPlugin,
    ngOvhApiWrappers,
    ngOvhBrowserAlert,
    ngOvhChatbot,
    ngOvhCheckboxTable,
    ngOvhDocUrl,
    ngOvhFormFlat,
    ngOvhSsoAuth,
    ngOvhSsoAuthModalPlugin,
    ngOvhStopEvent,
    ngOvhSwimmingPoll,
    ngOvhActionsMenu,
    ngOvhCloudUniverseComponents,
    ngOvhUserPref,
    ngOvhUiRouterLayout,
    ngOvhUiRouterLineProgress,
    'ovh-api-services',
    'ovh-common-style',
    ngQAllSettled,
    'angularMoment',
    ngOvhToaster,
    'oui',
    'oui.list-view',
    'chart.js',

    ngPaginationFront,
    ngOvhResponsiveTabs,
    'mgcrea.ngStrap.popover',
    'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.helpers.dimensions',
    'mgcrea.ngStrap.core',
    'ovh-angular-responsive-page-switcher',

    'ng-slide-down',
    ngOvhJsplumb,
    'tmh.dynamicLocale',

    'ovh-jquery-ui-draggable-ng',
    ngOvhJqueryUiDroppable,
    ngOvhSlider,
    ngTailLogs,
    'matchmedia-ng',
    'angular-websocket',
    'angular-translate-loader-pluggable',

    ngTranslateAsyncLoader,
    cloudUniverseComponents,
    ovhManagerBanner,
    ovhManagerNavbar,
    ovhManagerServerSidebar,
    errorPage,
  ])
  .config(
    /* @ngInject */ ($urlServiceProvider, $locationProvider, MANAGER_URLS) => {
      const dedicatedRedirections = [
        '/paas/veeam-enterprise',
        '/paas/veeam',
        '/iaas/vps',
        '/paas/nasha',
        '/vrack',
      ];

      dedicatedRedirections.forEach((redirectionPrefix) => {
        $urlServiceProvider.rules.when(
          new RegExp(`^${redirectionPrefix}`),
          (match, { path }) => {
            const { origin, pathname } = new URL(MANAGER_URLS.dedicated);
            window.location.replace(`${origin}${pathname}#${path}`);
          },
        );
      });

      $urlServiceProvider.rules.otherwise('/');
      $locationProvider.html5Mode(false);
    },
  )
  .config((responsivePopoverProvider) => {
    // tell to the module that we consider a mobile device with at least 800px width
    responsivePopoverProvider.setMobileMediaQuery('(max-width: 800px)');
  })
  .config((ouiTableConfigurationProvider) => {
    ouiTableConfigurationProvider
      .setCssConfig({
        tablePanel: 'oui-table-panel',
        table: 'oui-table oui-table_responsive',
        thead: 'oui-table__headers',
        tbody: 'oui-table__body',
        tr: 'oui-table__row',
        th: 'oui-table__header',
        td: 'oui-table__cell',
        sortable: 'oui-table__cell_sortable oui-table__cell_sortable-asc',
        sorted: 'oui-table__cell_sorted',
        sortableAsc: 'oui-table__cell_sortable-asc',
        sortableDesc: 'oui-table__cell_sortable-desc',
        closed: 'oui-table__row_closed',
        emptyTable: 'oui-table-empty',
      })
      .setPageSize(10).setExpandButtonTemplate(`
                <i role="button"
                    class="oui-icon oui-icon-chevron-right oui-table__expand-button"></i>
            `).setSelectorTemplate(`<div class="oui-checkbox">
                <input class="oui-checkbox__input"
                  id="{{$name}}"
                  type="checkbox"
                  data-ng-model="$value"
                  data-ng-change="$onChange()">
                <label class="oui-checkbox__label-container" for="{{$name}}">
                  <span class="oui-checkbox__label">
                    <span class="oui-checkbox__icon">
                      <i class="oui-icon oui-icon-checkbox-unchecked" aria-hidden="true"></i>
                      <i class="oui-icon oui-icon-checkbox-checked" aria-hidden="true"></i>
                      <i class="oui-icon oui-icon-checkbox-checkmark" aria-hidden="true"></i>
                    </span>
                  </span>
                </label>
              </div>
            `);
  })
  .config(
    /* @ngInject */ (CucConfigProvider, coreConfigProvider) => {
      CucConfigProvider.setRegion(coreConfigProvider.getRegion());
    },
  )
  .run(
    /* @ngInject */ ($state) => {
      $state.defaultErrorHandler((error) => {
        if (error.type === RejectType.ERROR) {
          $state.go(
            'error',
            {
              detail: {
                message: get(error.detail, 'data.message'),
                code: has(error.detail, 'headers')
                  ? error.detail.headers('x-ovh-queryId')
                  : null,
              },
            },
            { location: false },
          );
        }
      });
    },
  )
  .run(/* @ngTranslationsInject:json ./common/translations */);
