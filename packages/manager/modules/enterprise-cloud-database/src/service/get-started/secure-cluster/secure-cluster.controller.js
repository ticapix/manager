import {
  ENTERPRISE_CLOUD_DATABASE_CLUSTER_NAME_PATTERN,
  ENTERPRISE_CLOUD_DATABASE_PASSWORD_LENGTH,
} from './secure-cluster.constants';

export default class {
  /* @ngInject */
  constructor() {
    this.CLUSTER_NAME_PATTERN = ENTERPRISE_CLOUD_DATABASE_CLUSTER_NAME_PATTERN;
    this.PASSWORD_LENGTH = ENTERPRISE_CLOUD_DATABASE_PASSWORD_LENGTH;
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

  securityGroupDataChanged(data) {
    Object.assign(this.data, data);
    this.dataChange();
  }
}
