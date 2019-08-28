import {
  ENTERPRISE_CLOUD_DATABASE_PASSWORD_LENGTH,
} from './password.constants';

export default class EnterpriseCloudDatabasePasswordCtrl {
  /* @ngInject */
  constructor() {
    this.PASSWORD_LENGTH = ENTERPRISE_CLOUD_DATABASE_PASSWORD_LENGTH;
  }

  checkPasswordLength(password) {
    return password
      && (password.length >= this.PASSWORD_LENGTH.MIN)
      && (password.length <= this.PASSWORD_LENGTH.MAX);
  }
}
