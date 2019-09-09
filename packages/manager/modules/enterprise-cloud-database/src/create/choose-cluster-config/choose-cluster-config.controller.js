export default class {
  $onInit() {
    this.selectedCluster = this.enterpriceDb.cluster;
  }

  onClusterSelect(cluster) {
    this.selectedCluster = cluster;
    this.enterpriceDb.cluster = cluster;
  }
}
