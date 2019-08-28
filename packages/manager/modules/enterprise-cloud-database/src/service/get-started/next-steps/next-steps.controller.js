import isUndefined from 'lodash/isUndefined';
import { COMMANDS_LIST } from '../../connection-details/flags/flags.constants';

export default class {
  /* @ngInject */
  constructor() {
    this.COMMANDS_LIST = COMMANDS_LIST;
  }

  $onInit() {
    this.data = {
      dailyBackup: this.clusterDetails.autoBackup,
    };
  }

  dataChange(dailyBackup) {
    this.onDataChange({
      data: Object.assign({}, this.data, {
        dailyBackup: isUndefined(dailyBackup) ? this.data.dailyBackup : dailyBackup,
      }),
    });
  }

  maintenanceWindowChanged(data) {
    Object.assign(this.data, data);
    this.dataChange();
  }
}
