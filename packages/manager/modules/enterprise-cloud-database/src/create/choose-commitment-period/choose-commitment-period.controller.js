import head from 'lodash/head';

export default class {
  constructor() {
    this.dummy = null;
  }

  $onInit() {
    this.initializeMockData();
  }

  initializeMockData() {
    this.commitmentPeriods = [
      {
        id: '0-MONTHS',
        name: 'No commitment',
        months: 0,
        save: 0,
      },
      {
        id: '3-MONTHS',
        name: '3 Months',
        months: 3,
        save: 20,
      },
      {
        id: '6-MONTHS',
        name: '6 Months',
        months: 6,
        save: 50,
      },
      {
        id: '12-MONTHS',
        name: '12 Months',
        months: 12,
        save: 100,
      },
    ];
    this.selectedCommitmentPeriod = head(this.commitmentPeriods);
  }

  onCommitmentPeriodSelect(commitmentPeriod) {
    this.selectedCommitmentPeriod = commitmentPeriod;
    this.enterpriceDb.commitmentPeriod = commitmentPeriod;
  }
}
