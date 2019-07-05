import random from 'lodash/random';
import {
  DEFAULT_CRON_PATTERN_DOM,
  DEFAULT_CRON_PATTERN_MONTH,
  DEFAULT_CRON_PATTERN_DOW,
  SCHEDULE_ENUM,
} from './schedule.constants';
import CronValidator from './cron-validator';

export default class {
  $onInit() {
    this.minutesInvalid = false;
    this.hoursInvalid = false;
    this.domInvalid = false;
    this.monthInvalid = false;
    this.dowInvalid = false;
    this.cronValidator = new CronValidator();
    this.WORKFLOW_SCHEDULES = [{
      name: SCHEDULE_ENUM.ROTATE_7,
      cronPattern: {
        minutes: '*',
        hour: '22-23,0-5',
        dom: DEFAULT_CRON_PATTERN_DOM,
        month: DEFAULT_CRON_PATTERN_MONTH,
        dow: DEFAULT_CRON_PATTERN_DOW,
      },
      rotation: 7,
      maxExecutionCount: 0,
      valid: true,
    }, {
      name: SCHEDULE_ENUM.ROTATE_14,
      cronPattern: {
        minutes: '*',
        hour: '22-23,0-5',
        dom: DEFAULT_CRON_PATTERN_DOM,
        month: DEFAULT_CRON_PATTERN_MONTH,
        dow: DEFAULT_CRON_PATTERN_DOW,
      },
      rotation: 14,
      maxExecutionCount: 0,
      valid: true,
    }, {
      name: SCHEDULE_ENUM.CUSTOM,
      cronPattern: {
        minutes: random(0, 59),
        hour: random(0, 23),
        dom: DEFAULT_CRON_PATTERN_DOM,
        month: DEFAULT_CRON_PATTERN_MONTH,
        dow: DEFAULT_CRON_PATTERN_DOW,
      },
      rotation: 1,
      maxExecutionCount: 0,
      valid: true,
    }];
  }

  validateMinutes() {
    this.minutesInvalid = !this.cronValidator.validateMinutes(`${this.schedule.cronPattern.minutes}`);
    this.schedule.valid = !this.minutesInvalid;
  }

  validateHour() {
    this.hoursInvalid = !this.cronValidator.validateHours(`${this.schedule.cronPattern.hour}`);
    this.schedule.valid = !this.hoursInvalid;
  }

  validateDom() {
    this.domInvalid = !this.cronValidator.validateDays(`${this.schedule.cronPattern.dom}`);
    this.schedule.valid = !this.domInvalid;
  }

  validateMonth() {
    this.monthInvalid = !this.cronValidator.validateMonths(`${this.schedule.cronPattern.month}`, true);
    this.schedule.valid = !this.monthInvalid;
  }

  validateDow() {
    this.dowInvalid = !this.cronValidator.validateWeekdays(`${this.schedule.cronPattern.dow}`, true);
    this.schedule.valid = !this.dowInvalid;
  }
}
