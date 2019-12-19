import angular from 'angular';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

export default class {
  /* @ngInject */
  constructor($q, $stateParams, $timeout, $uibModalInstance, OvhApiSms, service, SMS_ALERTS) {
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.$uibModalInstance = $uibModalInstance;
    this.api = {
      sms: OvhApiSms.v6(),
    };
    this.service = service;
    this.constant = { SMS_ALERTS };
  }

  $onInit() {
    this.loading = {
      updateTemplates: false,
    };
    this.updated = false;
    this.attributes = ['templates'];
    this.model = {
      service: angular.copy(this.service),
    };
    this.smsBodyMaxLength = get(this.constant.SMS_ALERTS, 'sms.bodyMaxLength');
    this.variables = get(this.constant.SMS_ALERTS, 'variables');
  }

  /**
     * Set templates.
     * @return {Promise}
     */
  templates() {
    this.loading.updateTemplates = true;
    return this.$q.all([
      this.api.sms.put({
        serviceName: this.$stateParams.serviceName,
      }, pick(this.model.service, this.attributes)).$promise,
      this.$timeout(angular.noop, 1000),
    ]).then(() => {
      this.loading.updateTemplates = false;
      this.updated = true;
      return this.$timeout(() => this.close(), 1000);
    }).catch((error) => this.cancel({
      type: 'API',
      msg: error,
    }));
  }

  cancel(message) {
    return this.$uibModalInstance.dismiss(message);
  }

  close() {
    return this.$uibModalInstance.close(true);
  }

  /**
     * Has changed helper.
     * @return {Boolean}
     */
  hasChanged() {
    return !isEqual(
      pick(this.model.service, this.attributes),
      pick(this.service, this.attributes),
    );
  }
}
