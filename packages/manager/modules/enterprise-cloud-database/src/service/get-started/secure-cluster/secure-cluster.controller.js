import {
  ENTERPRISE_CLOUD_DATABASE_CLUSTER_NAME_PATTERN,
  ENTERPRISE_CLOUD_DATABASE_PASSWORD_LENGTH,
  ENTERPRISE_CLOUD_DATABASE_RULE_PATTERN,
  ENTERPRISE_CLOUD_DATABASE_SECURITY_GROUP_PATTERN,
} from './secure-cluster.constants';

export default class {
  /* @ngInject */
  constructor() {
    this.CLUSTER_NAME_PATTERN = ENTERPRISE_CLOUD_DATABASE_CLUSTER_NAME_PATTERN;
    this.PASSWORD_LENGTH = ENTERPRISE_CLOUD_DATABASE_PASSWORD_LENGTH;
    this.RULE_PATTERN = ENTERPRISE_CLOUD_DATABASE_RULE_PATTERN;
    this.SECURITY_GROUP_PATTERN = ENTERPRISE_CLOUD_DATABASE_SECURITY_GROUP_PATTERN;
  }

  $onInit() {
    this.data = {
      clusterName: this.clusterName,
      clusterPassword: '',
      rule: '',
      securityGroupName: '',
    };
  }

  dataChange(clusterPassword) {
    this.onDataChange({
      data: Object.assign(this.data, {
        clusterPassword: clusterPassword || this.data.clusterPassword,
      }),
    });
  }

  checkPasswordLength(password) {
    return password
      && (password.length >= this.PASSWORD_LENGTH.MIN)
      && (password.length <= this.PASSWORD_LENGTH.MAX);
  }
}
