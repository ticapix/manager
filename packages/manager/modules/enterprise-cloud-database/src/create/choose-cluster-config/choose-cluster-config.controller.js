import head from 'lodash/head';

export default class {
  $onInit() {
    // this.initializeMockData();
    this.selectedCluster = head(this.clusters);
  }

  initializeMockData() {
    this.clusters = [
      {
        id: 'PG16',
        name: 'PG16',
        ram: '16',
        cors: '8',
        storage: '450',
        storageType: 'SSD RAID',
        storageCount: '10',
      },
      {
        id: 'PG32',
        name: 'PG32',
        ram: '32',
        cors: '8',
        storage: '450',
        storageType: 'SSD RAID',
        storageCount: '10',
      },
      {
        id: 'PG64',
        name: 'PG64',
        ram: '64',
        cors: '8',
        storage: '960',
        storageType: 'SSD RAID',
        storageCount: '10',
      },
    ];
    this.selectedCluster = head(this.clusters);
  }

  onClusterSelect(cluster) {
    this.selectedCluster = cluster;
    this.enterpriceDb.cluster = cluster;
  }
}
