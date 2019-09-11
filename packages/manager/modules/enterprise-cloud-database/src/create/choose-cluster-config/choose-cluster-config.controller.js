export default class {
  constructor($timeout) {
    'ngInject';

    this.$timeout = $timeout;
  }

  $onInit() {
    this.selectedCluster = this.enterpriceDb.cluster;
  }

  onClusterSelect(cluster) {
    this.selectedCluster = cluster;
    this.enterpriceDb.cluster = cluster;
    if (this.onChange) {
      this.$timeout(() => this.onChange({
        cluster: this.selectedCluster,
      }));
    }
  }
}
