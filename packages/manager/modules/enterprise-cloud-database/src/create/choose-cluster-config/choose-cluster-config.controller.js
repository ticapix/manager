import head from 'lodash/head';

export default class {
  $onInit() {
    this.selectedCluster = head(this.clusters);
  }

  onClusterSelect(cluster) {
    this.selectedCluster = cluster;
    this.enterpriceDb.cluster = cluster;
  }
}
