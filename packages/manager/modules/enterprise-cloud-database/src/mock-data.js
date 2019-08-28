export default class MockData {
  /* @ngInject */
  constructor($q, $timeout) {
    this.$q = $q;
    this.$timeout = $timeout;
    this.capabilities = [
      {
        creationDate: '2019-06-24 09:56:03.603857+02',
        hostMemory: 32,
        hostStorageSize: 960,
        hostType: 'baremetal',
        id: '56baecf9-d497-4719-b490-15713f3e8749',
        internal: false,
        lastUpdate: '2019-06-24 09:56:03.603857+02',
        maxHostCount: 11,
        minHostCount: 3,
        name: 'cluster32',
        status: 'available',
        type: 'postgresql',
        versions: [
          '9.6',
          '10',
          '11',
        ],
        regions: [
          'eu-west-fr-1',
          'ca-east-qc-1',
        ],
      },
      {
        creationDate: '2019-06-24 10:02:11.232282+02',
        hostMemory: 16,
        hostStorageSize: 960,
        hostType: 'baremetal',
        id: '15502ddf-a2bd-4930-8e7c-cc19fba154a6',
        internal: false,
        lastUpdate: '2019-06-24 10:02:11.232282+02',
        maxHostCount: 11,
        minHostCount: 3,
        name: 'cluster16',
        status: 'available',
        type: 'postgresql',
        versions: [
          '9.6',
          '10',
          '11',
        ],
        regions: [
          'eu-west-fr-1',
          'ca-east-qc-1',
        ],
      },
      {
        creationDate: '2018-09-28 12:24:21.260387+02',
        hostMemory: 64,
        hostStorageSize: 1920,
        hostType: 'baremetal',
        id: '13e990ed-c102-4c4b-8456-f566333505d6',
        internal: false,
        lastUpdate: '2018-09-28 12:24:21.260387+02',
        maxHostCount: 11,
        minHostCount: 3,
        name: 'cluster64',
        status: 'available',
        type: 'postgresql',
        versions: [
          '9.6',
          '10',
          '11',
        ],
        regions: [
          'eu-west-fr-1',
          'ca-east-qc-1',
        ],
      },
      {
        creationDate: '2019-06-24 09:40:36.560233+02',
        hostMemory: 128,
        hostStorageSize: 3840,
        hostType: 'baremetal',
        id: '0b765494-b747-4aa1-acfa-b513404579a6',
        internal: false,
        lastUpdate: '2019-06-24 09:40:36.560233+02',
        maxHostCount: 11,
        minHostCount: 3,
        name: 'cluster128',
        status: 'available',
        type: 'postgresql',
        versions: [
          '9.6',
          '10',
          '11',
        ],
        regions: [
          'eu-west-fr-1',
          'ca-east-qc-1',
        ],
      },
    ];

    this.clusters = [
      'dfa2ef72-c5f3-41ae-8ca2-b1547c3fc61d',
      'b78deac6-08fb-4f43-a502-be8e2ca6ceb3',
      'c9804e9e-fe07-441b-99f0-c14535aa277b',
      '1c34e05b-d7ea-4a55-af59-0e0f528db0ea',
    ];

    this.clusterDetails = {
      'dfa2ef72-c5f3-41ae-8ca2-b1547c3fc61d': {
        lastUpdate: '2019-08-11T00:11:12+00:00',
        regionName: 'eu-west-fr-1',
        taskId: null,
        name: 'postgresql-3db3270d15d94a079bf532',
        creationDate: '2019-06-24T10:39:07+00:00',
        id: 'dfa2ef72-c5f3-41ae-8ca2-b1547c3fc61d',
        status: 'created',
        autoBackup: true,
        version: '11',
      },
      'b78deac6-08fb-4f43-a502-be8e2ca6ceb3': {
        status: 'created',
        creationDate: '2019-06-24T10:39:44+00:00',
        autoBackup: true,
        lastUpdate: '2019-08-11T00:11:12+00:00',
        name: 'postgresql-5ae213cbf0554a07b82e34',
        regionName: 'eu-west-fr-1',
        id: 'b78deac6-08fb-4f43-a502-be8e2ca6ceb3',
        taskId: null,
        version: '11',
      },
      'c9804e9e-fe07-441b-99f0-c14535aa277b': {
        version: '11',
        regionName: 'eu-west-fr-1',
        autoBackup: true,
        creationDate: '2019-06-24T10:39:16+00:00',
        name: 'postgresql-6239d4c36a9d4416873e5b',
        id: 'c9804e9e-fe07-441b-99f0-c14535aa277b',
        taskId: null,
        status: 'created',
        lastUpdate: '2019-08-11T00:10:41+00:00',
      },
      '1c34e05b-d7ea-4a55-af59-0e0f528db0ea': {
        name: 'postgresql-357bfdfbc7ae4ec3a256d4',
        version: '11',
        status: 'created',
        lastUpdate: '2019-08-11T00:12:43+00:00',
        id: '1c34e05b-d7ea-4a55-af59-0e0f528db0ea',
        taskId: null,
        regionName: 'eu-west-fr-1',
        creationDate: '2019-06-24T10:22:18+00:00',
        autoBackup: true,
      },
    };

    this.clusterEndpoints = {
      'dfa2ef72-c5f3-41ae-8ca2-b1547c3fc61d': [
        'd678079f-0b77-4ac3-a1d4-ecbf0499a8bc',
        '71401d25-8ad0-4da3-bcb9-57666378b7e5',
      ],
      'b78deac6-08fb-4f43-a502-be8e2ca6ceb3': [
        'ec53c03d-3ba9-434c-acb2-94dc11add5a9',
        'e7eabbf2-3b81-4b57-91a8-0a7afdae7313',
      ],
      'c9804e9e-fe07-441b-99f0-c14535aa277b': [
        '8bed0242-e02d-410d-8b56-2d168d87452e',
        '3ac62f1a-d8be-47b8-aea1-10e37d373a4d',
      ],
      '1c34e05b-d7ea-4a55-af59-0e0f528db0ea': [
        '11cb10f8-cdf7-41f7-9a88-9467d17c3ecc',
        'd8b1e2a5-6c51-41b3-a4a9-f7fa2639a60f',
      ],
    };

    this.endpointDetails = {
      'd678079f-0b77-4ac3-a1d4-ecbf0499a8bc': {
        fqdn: '3db3270d15d94a079bf532.prm.clouddb.ovh.net',
        name: 'read-write',
        status: 'created',
        id: 'd678079f-0b77-4ac3-a1d4-ecbf0499a8bc',
        creationDate: '2019-06-24T13:53:46+00:00',
        port: 18059,
        lastUpdate: '2019-06-24T13:53:47+00:00',
        taskId: null,
        clusterId: 'dfa2ef72-c5f3-41ae-8ca2-b1547c3fc61d',
      },
      '71401d25-8ad0-4da3-bcb9-57666378b7e5': {
        fqdn: '3db3270d15d94a079bf532.prm.clouddb.ovh.net',
        lastUpdate: '2019-06-24T13:53:47+00:00',
        name: 'read-only',
        status: 'created',
        taskId: null,
        clusterId: 'dfa2ef72-c5f3-41ae-8ca2-b1547c3fc61d',
        creationDate: '2019-06-24T13:53:47+00:00',
        port: 3878,
        id: '71401d25-8ad0-4da3-bcb9-57666378b7e5',
      },
      'ec53c03d-3ba9-434c-acb2-94dc11add5a9': {
        name: 'read-write',
        lastUpdate: '2019-06-24T11:17:43+00:00',
        creationDate: '2019-06-24T11:17:42+00:00',
        taskId: null,
        clusterId: 'b78deac6-08fb-4f43-a502-be8e2ca6ceb3',
        port: 3994,
        fqdn: '5ae213cbf0554a07b82e34.prm.clouddb.ovh.net',
        status: 'created',
        id: 'ec53c03d-3ba9-434c-acb2-94dc11add5a9',
      },
      'e7eabbf2-3b81-4b57-91a8-0a7afdae7313': {
        taskId: null,
        name: 'read-only',
        creationDate: '2019-06-24T11:17:43+00:00',
        id: 'e7eabbf2-3b81-4b57-91a8-0a7afdae7313',
        fqdn: '5ae213cbf0554a07b82e34.prm.clouddb.ovh.net',
        status: 'created',
        clusterId: 'b78deac6-08fb-4f43-a502-be8e2ca6ceb3',
        port: 27504,
        lastUpdate: '2019-06-24T11:17:43+00:00',
      },
      '8bed0242-e02d-410d-8b56-2d168d87452e': {
        port: 38356,
        creationDate: '2019-06-24T10:53:43+00:00',
        fqdn: '6239d4c36a9d4416873e5b.prm.clouddb.ovh.net',
        name: 'read-only',
        status: 'created',
        lastUpdate: '2019-06-24T10:53:43+00:00',
        clusterId: 'c9804e9e-fe07-441b-99f0-c14535aa277b',
        id: '8bed0242-e02d-410d-8b56-2d168d87452e',
        taskId: null,
      },
      '3ac62f1a-d8be-47b8-aea1-10e37d373a4d': {
        fqdn: '6239d4c36a9d4416873e5b.prm.clouddb.ovh.net',
        lastUpdate: '2019-06-24T10:53:44+00:00',
        clusterId: 'c9804e9e-fe07-441b-99f0-c14535aa277b',
        name: 'read-write',
        creationDate: '2019-06-24T10:53:43+00:00',
        status: 'created',
        taskId: null,
        port: 5213,
        id: '3ac62f1a-d8be-47b8-aea1-10e37d373a4d',
      },
      '11cb10f8-cdf7-41f7-9a88-9467d17c3ecc': {
        status: 'created',
        clusterId: '1c34e05b-d7ea-4a55-af59-0e0f528db0ea',
        id: '11cb10f8-cdf7-41f7-9a88-9467d17c3ecc',
        lastUpdate: '2019-06-24T10:52:11+00:00',
        port: 39898,
        name: 'read-only',
        fqdn: '357bfdfbc7ae4ec3a256d4.prm.clouddb.ovh.net',
        taskId: null,
        creationDate: '2019-06-24T10:52:10+00:00',
      },
      'd8b1e2a5-6c51-41b3-a4a9-f7fa2639a60f': {
        port: 41701,
        status: 'created',
        creationDate: '2019-06-24T10:52:10+00:00',
        taskId: null,
        lastUpdate: '2019-06-24T10:52:11+00:00',
        clusterId: '1c34e05b-d7ea-4a55-af59-0e0f528db0ea',
        name: 'read-write',
        id: 'd8b1e2a5-6c51-41b3-a4a9-f7fa2639a60f',
        fqdn: '357bfdfbc7ae4ec3a256d4.prm.clouddb.ovh.net',
      },
    };

    this.clusterHosts = {
      'dfa2ef72-c5f3-41ae-8ca2-b1547c3fc61d': [
        '80a9fd85-38d3-431e-8e3a-09b1c6241b00',
        '71cd63ed-c071-4758-9cd9-65db41c4bff5',
        '5e0137dc-0d22-4aae-818e-5260c0fcb0ab',
      ],
      'b78deac6-08fb-4f43-a502-be8e2ca6ceb3': [
        '462e02a6-7a05-4bfb-bad8-ddda451ea91b',
        'eecb7d70-ff85-480c-84de-34a6c5d03de3',
        '504db6e9-22fb-4927-91c3-38073e85e7f8',
      ],
      'c9804e9e-fe07-441b-99f0-c14535aa277b': [
        '441119c4-7d06-4f7d-92b8-55120d6136b3',
        '8b02056d-efe5-412d-89c6-37b832ad2930',
        '71387866-5433-4c14-a518-967365cc445c',
      ],
      '1c34e05b-d7ea-4a55-af59-0e0f528db0ea': [
        'be17a327-be4d-4bf6-af4b-7ba207123701',
        '36bfbd40-b8a7-4e5f-b8e5-d174ab72d9b1',
        '763b9487-2011-49f6-87ef-2cfb2f82dc29',
      ],
    };

    this.hostDetails = {
      '80a9fd85-38d3-431e-8e3a-09b1c6241b00': {
        status: 'created',
        name: 'backup2.3db3270d15d94a079bf532.prm.clouddb.ovh.net',
        id: '80a9fd85-38d3-431e-8e3a-09b1c6241b00',
        taskId: null,
        lastUpdate: '2019-08-11T00:10:31+00:00',
        creationDate: '2019-07-02T14:30:27+00:00',
      },
      '71cd63ed-c071-4758-9cd9-65db41c4bff5': {
        creationDate: '2019-07-03T13:50:37+00:00',
        taskId: null,
        status: 'created',
        name: 'node5.3db3270d15d94a079bf532.prm.clouddb.ovh.net',
        id: '71cd63ed-c071-4758-9cd9-65db41c4bff5',
        lastUpdate: '2019-08-11T00:04:45+00:00',
      },
      '5e0137dc-0d22-4aae-818e-5260c0fcb0ab': {
        status: 'created',
        creationDate: '2019-07-02T16:56:48+00:00',
        id: '5e0137dc-0d22-4aae-818e-5260c0fcb0ab',
        taskId: null,
        lastUpdate: '2019-08-11T00:07:23+00:00',
        name: 'node4.3db3270d15d94a079bf532.prm.clouddb.ovh.net',
      },
      '462e02a6-7a05-4bfb-bad8-ddda451ea91b': {
        name: 'node4.5ae213cbf0554a07b82e34.prm.clouddb.ovh.net',
        id: '462e02a6-7a05-4bfb-bad8-ddda451ea91b',
        creationDate: '2019-07-02T17:02:25+00:00',
        status: 'created',
        taskId: null,
        lastUpdate: '2019-08-11T00:04:44+00:00',
      },
      'eecb7d70-ff85-480c-84de-34a6c5d03de3': {
        name: 'node5.5ae213cbf0554a07b82e34.prm.clouddb.ovh.net',
        id: 'eecb7d70-ff85-480c-84de-34a6c5d03de3',
        taskId: null,
        status: 'created',
        lastUpdate: '2019-08-11T00:07:53+00:00',
        creationDate: '2019-07-03T12:53:06+00:00',
      },
      '504db6e9-22fb-4927-91c3-38073e85e7f8': {
        taskId: null,
        id: '504db6e9-22fb-4927-91c3-38073e85e7f8',
        name: 'backup1.5ae213cbf0554a07b82e34.prm.clouddb.ovh.net',
        creationDate: '2019-06-24T11:58:40+00:00',
        status: 'created',
        lastUpdate: '2019-08-11T00:10:31+00:00',
      },
      '441119c4-7d06-4f7d-92b8-55120d6136b3': {
        creationDate: '2019-06-24T11:38:30+00:00',
        id: '441119c4-7d06-4f7d-92b8-55120d6136b3',
        taskId: null,
        name: 'backup1.6239d4c36a9d4416873e5b.prm.clouddb.ovh.net',
        status: 'created',
        lastUpdate: '2019-08-11T00:09:28+00:00',
      },
      '8b02056d-efe5-412d-89c6-37b832ad2930': {
        status: 'created',
        name: 'node4.6239d4c36a9d4416873e5b.prm.clouddb.ovh.net',
        creationDate: '2019-07-02T16:58:51+00:00',
        lastUpdate: '2019-08-11T00:04:13+00:00',
        id: '8b02056d-efe5-412d-89c6-37b832ad2930',
        taskId: null,
      },
      '71387866-5433-4c14-a518-967365cc445c': {
        name: 'node5.6239d4c36a9d4416873e5b.prm.clouddb.ovh.net',
        status: 'created',
        lastUpdate: '2019-08-11T00:06:51+00:00',
        taskId: null,
        id: '71387866-5433-4c14-a518-967365cc445c',
        creationDate: '2019-07-03T12:48:03+00:00',
      },
      'be17a327-be4d-4bf6-af4b-7ba207123701': {
        taskId: null,
        status: 'created',
        creationDate: '2019-07-03T12:17:26+00:00',
        name: 'node5.357bfdfbc7ae4ec3a256d4.prm.clouddb.ovh.net',
        id: 'be17a327-be4d-4bf6-af4b-7ba207123701',
        lastUpdate: '2019-08-11T00:08:57+00:00',
      },
      '36bfbd40-b8a7-4e5f-b8e5-d174ab72d9b1': {
        lastUpdate: '2019-08-11T00:06:18+00:00',
        name: 'node6.357bfdfbc7ae4ec3a256d4.prm.clouddb.ovh.net',
        taskId: null,
        creationDate: '2019-07-03T13:08:54+00:00',
        status: 'created',
        id: '36bfbd40-b8a7-4e5f-b8e5-d174ab72d9b1',
      },
      '763b9487-2011-49f6-87ef-2cfb2f82dc29': {
        taskId: null,
        lastUpdate: '2019-08-11T00:12:02+00:00',
        status: 'created',
        name: 'backup1.357bfdfbc7ae4ec3a256d4.prm.clouddb.ovh.net',
        id: '763b9487-2011-49f6-87ef-2cfb2f82dc29',
        creationDate: '2019-06-24T11:44:12+00:00',
      },
    };

    this.serviceInfo = {
      '1c34e05b-d7ea-4a55-af59-0e0f528db0ea': {
        renew: {
          period: null,
          manualPayment: false,
          deleteAtExpiration: false,
          forced: false,
          automatic: false,
        },
        expiration: '2019-08-20',
        creation: '2019-08-21',
        contactTech: 'ls148374-ovh',
        canDeleteAtExpiration: false,
        contactAdmin: 'ls148374-ovh',
        contactBilling: 'ls148374-ovh',
        status: 'ok',
        engagedUpTo: null,
        renewalType: 'manual',
        domain: '1c34e05b-d7ea-4a55-af59-0e0f528db0ea',
        possibleRenewPeriod: [
          1,
        ],
        serviceId: 25317707,
      },
    };

    this.backups = [
      'f65c2783-0920-491c-addd-24edbafe5552',
      '26887cfa-c622-4f20-9e3f-9a702a4ba465',
    ];

    this.backupDetails = {
      'f65c2783-0920-491c-addd-24edbafe5552': {
        effectiveCreationDate: '2019-08-27T00:00:12+00:00',
        id: 'f65c2783-0920-491c-addd-24edbafe5552',
        lastUpdate: '2019-08-27T00:01:50+00:00',
        status: 'created',
        creationDate: '2019-08-27T00:00:04+00:00',
        name: 'daily_20190827',
        clusterId: '1c34e05b-d7ea-4a55-af59-0e0f528db0ea',
        taskId: null,
      },
      '26887cfa-c622-4f20-9e3f-9a702a4ba465': {
        status: 'created',
        id: '26887cfa-c622-4f20-9e3f-9a702a4ba465',
        clusterId: '1c34e05b-d7ea-4a55-af59-0e0f528db0ea',
        taskId: null,
        lastUpdate: '2019-08-26T00:01:54+00:00',
        effectiveCreationDate: '2019-08-26T00:00:13+00:00',
        creationDate: '2019-08-26T00:00:04+00:00',
        name: 'daily_20190826',
      },
    };
  }

  getCapabilities() {
    const defer = this.$q.defer();
    this.$timeout(() => {
      defer.resolve(this.capabilities);
    }, 100);
    return defer.promise;
  }

  getClusters() {
    const defer = this.$q.defer();
    this.$timeout(() => {
      defer.resolve(this.clusters);
    }, 100);
    return defer.promise;
  }

  getClusterDetails(clusterId) {
    const defer = this.$q.defer();
    this.$timeout(() => {
      defer.resolve(this.clusterDetails[clusterId]);
    }, 5000);
    return defer.promise;
  }

  getClusterEndpoints(clusterId) {
    const defer = this.$q.defer();
    this.$timeout(() => {
      defer.resolve(this.clusterEndpoints[clusterId]);
    }, 100);
    return defer.promise;
  }

  getClusterEndpointDetails(endpointId) {
    const defer = this.$q.defer();
    this.$timeout(() => {
      defer.resolve(this.endpointDetails[endpointId]);
    }, 100);
    return defer.promise;
  }

  getClusterHosts(clusterId) {
    const defer = this.$q.defer();
    this.$timeout(() => {
      defer.resolve(this.clusterHosts[clusterId]);
    }, 100);
    return defer.promise;
  }

  getClusterHostDetails(clusterId, hostId) {
    const defer = this.$q.defer();
    this.$timeout(() => {
      defer.resolve(this.hostDetails[hostId]);
    }, 100);
    return defer.promise;
  }

  getServiceInfo(clusterId) {
    const defer = this.$q.defer();
    this.$timeout(() => {
      defer.resolve(this.serviceInfo[clusterId]);
    }, 1000);
    return defer.promise;
  }

  getBackups() {
    const defer = this.$q.defer();
    this.$timeout(() => {
      defer.resolve(this.backups);
    }, 1000);
    return defer.promise;
  }

  getBackupDetails(backupId) {
    const defer = this.$q.defer();
    this.$timeout(() => {
      defer.resolve(this.backupDetails[backupId]);
    }, 1000);
    return defer.promise;
  }
}
