import each from 'lodash/each';
import find from 'lodash/find';
import forOwn from 'lodash/forOwn';
import get from 'lodash/get';
import head from 'lodash/head';
import includes from 'lodash/includes';
import keys from 'lodash/keys';
import last from 'lodash/last';
import map from 'lodash/map';
import set from 'lodash/set';
import split from 'lodash/split';
import toArray from 'lodash/toArray';
import toUpper from 'lodash/toUpper';

import { DATABASE_CONSTANTS } from './create.constants';

export default class EnterpriseCloudDatabaseCreateCtrl {
  /* @ngInject */
  constructor(enterpriseCloudDatabaseService) {
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
  }

  $onInit() {
    this.DATABASE_CONSTANTS = DATABASE_CONSTANTS;
    this.databasePlanMap = {};
    this.databases = [];
    this.populateAdditionalReplicas();
    this.populateDatabaseClustersMap();
    console.log('databasePlanMap ', this.databasePlanMap);
    this.populateUniqueDatabases();
    console.log('databases ', this.databases);
    this.populateCapabilityDetails();
    console.log('capabilities ', this.capabilities);
    const defaultDb = head(this.databases);
    const defaultDbVersion = head(defaultDb.versions);
    const regions = keys(this.databasePlanMap[`${defaultDb.name}-${defaultDbVersion}`]);
    const defaultDatacenter = head(regions);
    const defaultCluster = head(this.capabilities);
    this.enterpriceDb = {
      database: defaultDb,
      datacenter: defaultDatacenter,
      cluster: defaultCluster,
      commitmentPeriod: null,
      paymentType: null,
      additionalReplicaCount: null,
    };
    this.regions = toArray(regions);
  }

  populateAdditionalReplicas() {
    this.additionalReplicas = [
      {
        value: 1,
        price: 6000,
      },
      {
        value: 2,
        price: 12000,
      },
      {
        value: 3,
        price: 18000,
      },
    ];
  }

  populateCapabilityDetails() {
    const catalog = get(this, 'catalog');
    const capabilities = get(this, 'capabilities');
    map(capabilities, (capability) => {
      // populate cpu, memory, storage
      const plans = get(catalog, 'plans');
      const plan = find(plans, p => p.planCode === capability.name);
      set(capability, 'cpu', get(plan, 'blobs.technical.cpu'));
      set(capability, 'memory', get(plan, 'blobs.technical.memory'));
      // set(capability, 'storage', get(plan, 'blobs.technical.storage'));
      this.constructor.populateStorage(capability, get(plan, 'blobs.technical.storage'));

      // populate supported databases and regions
      const configurations = get(plan, 'configurations');
      each(configurations, (conf) => {
        if (conf.name === 'dbms') {
          set(capability, 'databases', get(conf, 'values'));
        } else if (conf.name === 'region') {
          set(capability, 'regions', get(conf, 'values'));
        }
      });
      // populate pricing
      set(capability, 'pricings', get(plan, 'pricings'));
    });
  }

  static populateStorage(capability, storages) {
    const storage = {
      size: get(head(storages.disks), 'capacity', 0),
      type: toUpper(get(head(storages.disks), 'technology', null)),
      count: get(storages, 'disks.length', 0),
    };
    set(capability, 'storage', storage);
  }

  populateDatabaseClustersMap() {
    const plans = get(this.catalog, 'plans');
    each(plans, (plan) => {
      const configurations = get(plan, 'configurations');
      let databases = null;
      let regions = null;
      each(configurations, (conf) => {
        if (conf.name === 'dbms') {
          databases = get(conf, 'values');
        } else if (conf.name === 'region') {
          regions = get(conf, 'values');
        }
      });
      each(databases, (db) => {
        if (!this.databasePlanMap[db]) {
          this.databasePlanMap[db] = {};
        }
        each(regions, (region) => {
          if (!this.databasePlanMap[db][region]) {
            this.databasePlanMap[db][region] = {
              clusters: [],
            };
          }
          const supportedRegions = this.databasePlanMap[db][region];
          if (!includes(supportedRegions.clusters, plan.planCode)) {
            supportedRegions.clusters[supportedRegions.clusters.length] = plan.planCode;
          }
        });
      });
    });
  }

  populateUniqueDatabases() {
    const databases = {};
    forOwn(this.databasePlanMap, (value, key) => {
      const splitArray = split(key, '-');
      if (!databases[head(splitArray)]) {
        databases[head(splitArray)] = {
          name: head(splitArray),
          versions: [],
          isAvailable: true,
          selectedVersion: null,
        };
        this.populateDatabaseDetails(head(splitArray), databases[head(splitArray)]);
      }
      const db = databases[head(splitArray)];
      if (!includes(db.versions, last(splitArray))) {
        if (db.versions.length === 0) {
          db.selectedVersion = last(splitArray);
        }
        db.versions[db.versions.length] = last(splitArray);
      }
    });
    this.databases = toArray(databases);
  }

  populateDatabaseDetails(name, database) {
    const db = this.DATABASE_CONSTANTS[name];
    set(database, 'iconURL', db.iconURL, null);
    set(database, 'displayName', db.name, name);
  }

  onDatabaseSelect(database) {
    const regions = keys(this.databasePlanMap[`${database.name}-${database.selectedVersion}`]);
    this.regions = toArray(regions);
  }

  onRegionSelect(region) {
    const database = `${this.enterpriceDb.database.name}-${this.enterpriceDb.database.selectedVersion}`;
    this.clusters = toArray(this.databasePlanMap[database][region]);
  }

  orderDatabaseCluster() {
    this.order = true;
    console.log(this.enterpriceDb);
  }
}
