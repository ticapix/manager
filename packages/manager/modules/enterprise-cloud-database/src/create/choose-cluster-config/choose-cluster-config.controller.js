export default class {
  constructor($timeout) {
    'ngInject';

    this.$timeout = $timeout;
  }

  $onInit() {
    this.selectedCluster = this.enterpriseDb.cluster;
  }

  onClusterSelect(cluster) {
    this.selectedCluster = cluster;
    this.enterpriseDb.cluster = cluster;
    if (this.onChange) {
      this.$timeout(() => this.onChange({
        cluster: this.selectedCluster,
      }));
    }
  }
}
