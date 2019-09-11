import get from 'lodash/get';
import zxcvbn from 'zxcvbn';

import {
  ENTERPRISE_CLOUD_DATABASE_PASSWORD_LENGTH,
} from './password.constants';

export default class EnterpriseCloudDatabasePasswordCtrl {
  /* @ngInject */
  constructor() {
    this.PASSWORD_LENGTH = ENTERPRISE_CLOUD_DATABASE_PASSWORD_LENGTH;
  }

  $onInit() {
    this.password = '';
  }

  checkPasswordLength(password) {
    return password
      && (password.length >= this.PASSWORD_LENGTH.MIN)
      && (password.length <= this.PASSWORD_LENGTH.MAX);
  }

  passwordChanged(password) {
    this.passwordScore = password ? get(zxcvbn(password), 'score') : 0;
    this.password = password || '';
    this.onChange({ data: password });
  }
}
