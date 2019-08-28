import find from 'lodash/find';
import head from 'lodash/head';
import map from 'lodash/map';
import range from 'lodash/range';

import { WEEKDAY_NUMBERS } from './maintenance-window.constants';

export default class {
  /* @ngInject */
  constructor() {
    this.WEEKDAY_NUMBERS = WEEKDAY_NUMBERS;
  }

  $onInit() {
    this.adjustWindowEnabled = false;
    this.hourMap = map(range(24), hour => ({
      hour,
      time: ((hour % 12 === 0 ? 12 : hour % 12) + (hour >= 12 ? ' pm' : ' am')),
    }));
    this.durationMap = map(range(1, 13), hour => ({
      hour,
      time: (hour > 1 ? `${hour} hours` : `${hour} hour`),
    }));
    this.data = {};
    this.resetMaintenanceWindow();
  }

  dataChange() {
    this.onDataChange({
      data: {
        dayOfWeek: this.data.weekdayNumber ? this.data.weekdayNumber.number : undefined,
        duration: this.data.duration ? this.data.duration.hour * 60 : undefined,
        startTime: this.data.hour ? `${`0${this.data.hour.hour}`.slice(-2)}:00:00` : undefined,
      },
    });
  }

  isMaintenanceWindowInfoAvailable() {
    return this.maintenanceWindow || (
      this.data.weekdayNumber && this.data.hour && this.data.duration
    );
  }

  resetMaintenanceWindow() {
    Object.assign(this.data, {
      weekdayNumber: this.maintenanceWindow
        ? find(this.WEEKDAY_NUMBERS, { number: this.maintenanceWindow.dayOfWeek })
        : undefined,
      hour: this.maintenanceWindow
        ? find(this.hourMap, { hour: parseInt(head(this.maintenanceWindow.startTime.split(':')), 10) })
        : undefined,
      duration: this.maintenanceWindow
        ? find(this.durationMap, { hour: (this.maintenanceWindow.duration / 60) })
        : undefined,
    });
    this.dataChange();
  }

  toggleAdjustWindow() {
    this.adjustWindowEnabled = !this.adjustWindowEnabled;
  }
}
