import get from 'lodash/get';

import { FeatureAvailability } from '@ovh-ux/ng-ovh-telecom-universe-components';
import { FREEFAX_AVAILABILITY } from '@ovh-ux/manager-freefax';
import { OTB_AVAILABILITY } from '@ovh-ux/manager-overthebox';
import { SMS_AVAILABILITY } from '@ovh-ux/manager-sms';
import { ALIAS_AVAILABILITY } from '../../app/telecom/orders/alias/orders-alias.constants';
import { PACK_AVAILABILITY } from '../../app/telecom/pack/pack.constant';
import { TELEPHONY_AVAILABILITY } from '../../app/telecom/telephony/telecom-telephony.constant';

import { URLS } from './sidebar.constants';

angular.module('managerApp').run(($translate, asyncLoader) => {
  asyncLoader.addTranslations(
    import(`./translations/Messages_${$translate.use()}.json`)
      .catch(() =>
        import(`./translations/Messages_${$translate.fallbackLanguage()}.json`),
      )
      .then((x) => x.default),
  );
  $translate.refresh();
});
angular
  .module('managerApp')
  .config((SidebarMenuProvider) => {
    // add translation path
    SidebarMenuProvider.addTranslationPath('../components/sidebar');
  })
  .run(
    /* @ngInject */ (
      $sce,
      $translate,
      atInternet,
      betaPreferenceService,
      FaxSidebar,
      OverTheBoxSidebar,
      OvhApiMe,
      PackSidebar,
      SidebarMenu,
      SmsSidebar,
      TelecomMediator,
      TelephonySidebar,
      ORDER_URLS,
      REDIRECT_URLS,
    ) => {
      /*= =========================================
    =                   HELPERS                 =
    ========================================== */

      function setTracker(name, navigation, level2, chapter1) {
        return () => {
          atInternet.trackClick({
            name,
            type: navigation,
            level2,
            chapter1,
          });

          return true;
        };
      }

      /*= =========================================
    =            SIDEBAR MENU ITEMS            =
    ========================================== */

      /* ----------  TASK MENU ITEM  ----------*/

      function addTaskSection() {
        return SidebarMenu.addMenuItem({
          title: $translate.instant('telecom_sidebar_section_task'),
          category: 'task',
          icon: 'ovh-font ovh-font-tasks',
          state: 'task',
          loadOnState: 'task',
        });
      }

      function addV4Section() {
        return SidebarMenu.addMenuItem({
          title: $translate.instant('telecom_sidebar_section_v4'),
          category: 'backToV4',
          icon: 'ovh-font ovh-font-backToV4',
          url: REDIRECT_URLS.telephonyV4,
          onClick: setTracker('ManagerV4', 'navigation', 'Telecom', 'telecom'),
        });
      }

      /* ----------  SERVICES MENU ITEMS  ----------*/

      function initSidebarMenuItems(count, beta) {
        // add v4 button
        addV4Section();

        // add sidebar pack item
        if (count.pack > 0 || beta) {
          PackSidebar.init(beta);
        }

        // add sidebar telephony item
        if (get(count, 'telephony', beta)) {
          TelephonySidebar.init(beta);
        }

        // add sidebar SMS item
        if (get(count, 'sms', beta)) {
          SmsSidebar.init(beta);
        }

        // add sidebar fax item
        if (get(count, 'freefax', beta)) {
          FaxSidebar.init(beta);
        }

        // add sidenar otb item
        if (get(count, 'overTheBox', beta)) {
          OverTheBoxSidebar.init(beta);
        }

        // add sidebar task item
        addTaskSection();
      }

      /* -----  End of SIDEBAR MENU ITEMS  ------*/

      /*= ===========================================
    =            ACTIONS MENU OPTIONS            =
    ============================================ */

      function initSidebarMenuActionsOptions(user) {
        const aliasAvailability = new FeatureAvailability(
          user,
          ALIAS_AVAILABILITY,
        );
        const freefaxAvailability = new FeatureAvailability(
          user,
          FREEFAX_AVAILABILITY,
        );
        const otbAvailability = new FeatureAvailability(user, OTB_AVAILABILITY);
        const packAvailability = new FeatureAvailability(
          user,
          PACK_AVAILABILITY,
        );
        const smsAvailability = new FeatureAvailability(user, SMS_AVAILABILITY);
        const telephonyAvailability = new FeatureAvailability(
          user,
          TELEPHONY_AVAILABILITY,
        );
        SidebarMenu.addActionsMenuOptions([
          ...(aliasAvailability.isAvailable('order')
            ? [
                {
                  title: $translate.instant(
                    'telecom_sidebar_actions_menu_number',
                  ),
                  icon: 'ovh-font ovh-font-hashtag',
                  state: 'telecom.orders.alias',
                },
              ]
            : []),
          {
            title: $translate.instant('telecom_sidebar_actions_menu_domain'),
            icon: 'ovh-font ovh-font-domain',
            href: URLS.domain[user.ovhSubsidiary] || URLS.domain.FR,
            target: '_blank',
            external: true,
            onClick: setTracker(
              'DomainsName',
              'navigation',
              'Telecom',
              'telecom',
            ),
          },
          ...(packAvailability.isAvailable('order') ||
          otbAvailability.isAvailable('order')
            ? [
                {
                  title: $translate.instant(
                    'telecom_sidebar_actions_menu_internet',
                  ),
                  icon: 'ovh-font ovh-font-telecom-ethernet',
                  subActions: [
                    ...(packAvailability.isAvailable('order')
                      ? [
                          {
                            title: $translate.instant(
                              'telecom_sidebar_actions_menu_internet_xdsl',
                            ),
                            href: URLS.internet.xdsl.FR,
                            target: '_blank',
                            external: true,
                            onClick: setTracker(
                              'order-ADSL_VDSL',
                              'navigation',
                              'Telecom',
                              'telecom',
                            ),
                          },
                          {
                            title: $translate.instant(
                              'telecom_sidebar_actions_menu_internet_fiber',
                            ),
                            href: URLS.internet.fiber.FR,
                            target: '_blank',
                            external: true,
                            onClick: setTracker(
                              'order-FIBER',
                              'navigation',
                              'Telecom',
                              'telecom',
                            ),
                          },
                          {
                            title: $translate.instant(
                              'telecom_sidebar_actions_menu_internet_sdsl',
                            ),
                            href: URLS.internet.sdsl.FR,
                            target: '_blank',
                            external: true,
                            onClick: setTracker(
                              'order-SDSL',
                              'navigation',
                              'Telecom',
                              'telecom',
                            ),
                          },
                          {
                            title: $translate.instant(
                              'telecom_sidebar_actions_menu_internet_adsl_creation',
                            ),
                            href: URLS.internet.adslCreation.FR,
                            target: '_blank',
                            external: true,
                            onClick: setTracker(
                              'order-ADSL',
                              'navigation',
                              'Telecom',
                              'telecom',
                            ),
                          },
                        ]
                      : []),
                    ...(otbAvailability.isAvailable('order')
                      ? [
                          {
                            title: $translate.instant(
                              'telecom_sidebar_actions_menu_internet_otb',
                            ),
                            href: URLS.overTheBox.FR,
                          },
                        ]
                      : []),
                  ],
                },
              ]
            : []),
          ...(telephonyAvailability.isAvailable('order')
            ? [
                {
                  title: $translate.instant(
                    'telecom_sidebar_actions_menu_telephony',
                  ),
                  icon: 'ovh-font ovh-font-phone',
                  subActions: [
                    {
                      title: $translate.instant(
                        'telecom_sidebar_actions_menu_telephony_voip',
                      ),
                      href: URLS.telephony.voip.FR,
                      target: '_blank',
                      external: true,
                      onClick: setTracker(
                        'order-VOIP',
                        'navigation',
                        'Telecom',
                        'telecom',
                      ),
                    },
                    {
                      title: $translate.instant(
                        'telecom_sidebar_actions_menu_telephony_siptrunk',
                      ),
                      href: URLS.telephony.siptrunk.FR,
                      target: '_blank',
                      external: true,
                      onClick: setTracker(
                        'order-Pack_SIP_Trunk',
                        'navigation',
                        'Telecom',
                        'telecom',
                      ),
                    },
                    {
                      title: $translate.instant(
                        'telecom_sidebar_actions_menu_telephony_siptrunk_call',
                      ),
                      href: URLS.telephony.siptrunkCall.FR,
                      target: '_blank',
                      external: true,
                      onClick: setTracker(
                        'order-SIP_Trunk_Abo',
                        'navigation',
                        'Telecom',
                        'telecom',
                      ),
                    },
                    {
                      title: $translate.instant(
                        'telecom_sidebar_actions_menu_accessories',
                      ),
                      state: 'telecom.orders.accessories',
                    },
                  ],
                },
              ]
            : []),
          {
            title: $translate.instant('telecom_sidebar_actions_menu_email'),
            icon: 'ovh-font ovh-font-mail',
            subActions: [
              {
                title: $translate.instant(
                  'telecom_sidebar_actions_menu_email_exchange',
                ),
                href:
                  URLS.email.exchange[user.ovhSubsidiary] ||
                  ORDER_URLS.email.exchange.FR,
                target: '_blank',
                external: true,
                onClick: setTracker(
                  'order-Email_ExchangeHosted',
                  'navigation',
                  'Telecom',
                  'telecom',
                ),
              },
              {
                title: $translate.instant(
                  'telecom_sidebar_actions_menu_email_sharepoint',
                ),
                href:
                  URLS.email.sharepoint[user.ovhSubsidiary] ||
                  ORDER_URLS.email.sharepoint.FR,
                target: '_blank',
                external: true,
                onClick: setTracker(
                  'order-Email_Sharepoint',
                  'navigation',
                  'Telecom',
                  'telecom',
                ),
              },
            ],
          },
          {
            title: $translate.instant('telecom_sidebar_actions_menu_office'),
            svg: $sce.trustAsHtml(
              '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 53.59 64.356" width="32" height="32">' +
                '<g transform="translate(-216.07358,-549.28882)">' +
                '<g transform="matrix(1.8232952,0,0,1.8232952,-597.71681,-124.12247)">' +
                '<g transform="translate(0,-91.137241)">' +
                '<g fill="#143F6C" transform="matrix(0.74069815,0,0,0.74069815,98.5698,-8.2505871)">' +
                '<path d="m469.87,671.03,0-28.52,25.229-9.3238,13.711,4.3877,0,38.392-13.711,4.133-25.229-9.0691,25.229,3.0361,0-33.201-16.454,3.8392,0,22.487z"/>' +
                '</g></g></g></g></svg>',
            ),
            subActions: [
              {
                title: $translate.instant(
                  'telecom_sidebar_actions_menu_office_business',
                ),
                href:
                  URLS.office.business[user.ovhSubsidiary] ||
                  ORDER_URLS.office.business.FR,
                target: '_blank',
                external: true,
                onClick: setTracker(
                  'order-O365_Business',
                  'navigation',
                  'Telecom',
                  'telecom',
                ),
              },
              {
                title: $translate.instant(
                  'telecom_sidebar_actions_menu_office_sharepoint',
                ),
                href:
                  URLS.office.sharepoint[user.ovhSubsidiary] ||
                  ORDER_URLS.office.sharepoint.FR,
                target: '_blank',
                external: true,
                onClick: setTracker(
                  'order-O365_Sharepoint',
                  'navigation',
                  'Telecom',
                  'telecom',
                ),
              },
            ],
          },
          ...(smsAvailability.isAvailable('order')
            ? [
                {
                  title: $translate.instant('telecom_sidebar_actions_menu_sms'),
                  icon: 'ovh-font ovh-font-message',
                  ...(smsAvailability.isAvailable('hlr')
                    ? {
                        subActions: [
                          {
                            title: $translate.instant(
                              'telecom_sidebar_actions_menu_sms',
                            ),
                            state: 'sms.order',
                          },
                          {
                            title: $translate.instant(
                              'telecom_sidebar_actions_menu_sms_hlr',
                            ),
                            href: URLS.sms.hlr.FR,
                            target: '_blank',
                            external: true,
                            onClick: setTracker(
                              'order-sms-HLR',
                              'navigation',
                              'Telecom',
                              'telecom',
                            ),
                          },
                        ],
                      }
                    : {
                        state: 'sms.order',
                      }),
                },
              ]
            : []),
          ...(freefaxAvailability.isAvailable('order')
            ? [
                {
                  title: $translate.instant('telecom_sidebar_actions_menu_fax'),
                  icon: 'ovh-font ovh-font-print',
                  href: URLS.fax.FR,
                  target: '_blank',
                  external: true,
                  onClick: setTracker(
                    'Fax',
                    'navigation',
                    'Telecom',
                    'telecom',
                  ),
                },
              ]
            : []),
        ]);
      }

      /* -----  End of ACTIONS MENU OPTIONS  ------*/

      /*= =====================================
    =            INITIALIZATION            =
    ====================================== */

      function init() {
        // set initialization promise
        return SidebarMenu.setInitializationPromise(
          betaPreferenceService
            .isBetaActive()
            .then((beta) => $translate.refresh().then(() => beta))
            .then((beta) => {
              if (beta) {
                return initSidebarMenuItems({}, beta);
              }
              return TelecomMediator.initServiceCount(false).then((count) => {
                initSidebarMenuItems(count, beta);
              });
            })
            .then(() => OvhApiMe.v6().get().$promise)
            .then((user) => initSidebarMenuActionsOptions(user)),
        );
      }

      /* -----  End of INITIALIZATION  ------*/

      init();
    },
  );
