export default class {
  $onInit() {
    this.selectedCommitmentPeriod = this.enterpriceDb.commitmentPeriod;
  }

  onCommitmentPeriodSelect(commitmentPeriod) {
    this.selectedCommitmentPeriod = commitmentPeriod;
    this.enterpriceDb.commitmentPeriod = commitmentPeriod;
  }
}
