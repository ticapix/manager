import get from 'lodash/get';
import map from 'lodash/map';
import set from 'lodash/set';

import groupPortaByNumbers from './telecom-telephony-alias-portability-portabilities.service';

export default class TelecomTelephonyAliasPortabilitiesCtrl {
  /* @ngInject */
  constructor($q, $stateParams, $translate, OvhApiTelephony, TucToast) {
    this.$translate = $translate;
    this.$stateParams = $stateParams;
    this.$q = $q;
    this.OvhApiTelephony = OvhApiTelephony;
    this.TucToast = TucToast;
  }

  $onInit() {
    this.loading = {
      cancel: false,
    };

    this.serviceName = this.$stateParams.serviceName;
    this.init();
  }

  init() {
    this.isLoading = true;
    this.fetchPortability()
      .then((result) => {
        this.numbers = groupPortaByNumbers(result);
      })
      .catch((error) => {
        this.TucToast.error(
          this.$translate.instant('telephony_alias_portabilities_load_error', {
            error: get(error, 'data.message'),
          }),
        );
        return this.$q.reject(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  fetchPortability() {
    return this.OvhApiTelephony.Portability()
      .v6()
      .query({
        billingAccount: this.$stateParams.billingAccount,
      })
      .$promise.then((ids) =>
        this.$q.all(
          map(ids, (id) =>
            this.OvhApiTelephony.Portability()
              .v6()
              .get({
                billingAccount: this.$stateParams.billingAccount,
                id,
              })
              .$promise.then((porta) =>
                this.$q
                  .all({
                    steps: this.OvhApiTelephony.Portability()
                      .v6()
                      .getStatus({
                        billingAccount: this.$stateParams.billingAccount,
                        id,
                      }).$promise,
                    canBeCancelled: this.OvhApiTelephony.Portability()
                      .v6()
                      .canBeCancelled({
                        billingAccount: this.$stateParams.billingAccount,
                        id,
                      }).$promise,
                    documentAttached: this.OvhApiTelephony.Portability()
                      .PortabilityDocument()
                      .v6()
                      .query({
                        billingAccount: this.$stateParams.billingAccount,
                        id,
                      }).$promise,
                  })
                  .then((results) => {
                    set(porta, 'steps', results.steps);
                    set(porta, 'canBeCancelled', results.canBeCancelled.value);
                    set(porta, 'documentAttached', results.documentAttached);
                    return porta;
                  }),
              ),
          ),
        ),
      );
  }

  confirmCancelPortability(portability) {
    this.loading.cancel = true;

    return this.OvhApiTelephony.Portability()
      .v6()
      .cancel(
        {
          billingAccount: this.$stateParams.billingAccount,
          id: portability.id,
        },
        {},
      )
      .$promise.then(() => {
        this.TucToast.success(
          this.$translate.instant(
            'telephony_alias_portabilities_cancel_success',
          ),
        );
        return this.init();
      })
      .catch((error) => {
        this.TucToast.error(
          [
            this.$translate.instant(
              'telephony_alias_portabilities_cancel_error',
            ),
            get(error, 'data.message'),
          ].join(' '),
        );
        return this.$q.reject(error);
      })
      .finally(() => {
        this.loading.cancel = false;
      });
  }
}
