import each from 'lodash/each';
import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import get from 'lodash/get';
import head from 'lodash/head';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import last from 'lodash/last';
import map from 'lodash/map';
import set from 'lodash/set';
import sortBy from 'lodash/sortBy';
import split from 'lodash/split';
import toArray from 'lodash/toArray';
import uniqBy from 'lodash/uniqBy';

import { COMMITMENT_PERIODS, PAYMENT_TYPES } from './create.constants';
import { DATABASE_CONSTANTS } from '../enterprise-cloud-database.constants';

export default class EnterpriseCloudDatabaseCreateCtrl {
  /* @ngInject */
  constructor($translate, enterpriseCloudDatabaseService) {
    this.$translate = $translate;
    this.enterpriseCloudDatabaseService = enterpriseCloudDatabaseService;
  }

  $onInit() {
    this.commitmentPeriods = COMMITMENT_PERIODS;
    this.paymentTypes = PAYMENT_TYPES;
    this.DATABASE_CONSTANTS = DATABASE_CONSTANTS;
    this.minHostCount = get(head(this.capabilities), 'minHostCount', 0);
    this.databasePlanMap = {};
    this.populateCapabilityDetails();
    this.databases = this.getUniqueDatabases();
    this.populateDefaultValues();
  }

  populateDefaultValues() {
    const defaultDb = head(this.databases);
    const defaultRegions = keys(this.databasePlanMap[defaultDb.originalName]);
    const defaultDatacenter = head(defaultRegions);
    const defaultClusters = this
      .databasePlanMap[defaultDb.originalName][defaultDatacenter].clusters;
    const defaultCluster = find(defaultClusters, cluster => cluster.memory.size === 32);
    this.populateAdditionalReplicas(defaultCluster);
    this.enterpriceDb = {
      database: defaultDb,
      datacenter: defaultDatacenter,
      cluster: defaultCluster,
      commitmentPeriod: head(this.commitmentPeriods),
      paymentType: head(this.paymentTypes),
      additionalReplica: head(this.additionalReplicas),
      defaultReplicaCount: this.minHostCount,
    };
    this.regions = toArray(defaultRegions);
    this.clusters = defaultClusters;
    this.clusters = sortBy(this.clusters, cluster => cluster.memory.size);
  }

  populateCapabilityDetails() {
    const catalog = get(this, 'catalog');
    const capabilities = get(this, 'capabilities');
    map(capabilities, (capability) => {
      const plans = get(catalog, 'plans', []);
      const plan = find(plans, p => p.planCode === capability.name);
      if (!isEmpty(plan)) {
        // populate supported databases and regions
        this.populateDatabasesAndRegions(capability, plan, get(capability, 'status'));
      }
    });
  }

  populateAdditionalReplicas(cluster) {
    const price = get(cluster, 'price', {});
    const minReplicas = get(cluster, 'minHostCount', 0);
    const maxReplicas = get(cluster, 'maxHostCount', 0);
    this.additionalReplicas = [
      {
        value: 0,
        price: 0,
        label: this.$translate.instant('enterprise_cloud_database_create_additional_replicas_empty'),
      },
    ];
    for (let i = 1; i <= maxReplicas - minReplicas; i += 1) {
      this.additionalReplicas[i] = {
        value: i,
        price: price * i,
        label: this.$translate.instant('enterprise_cloud_database_create_additional_replicas_price', {
          replicaCount: i,
          replicaPrice: price.total * i,
          currencySymbol: '$',
        }),
      };
    }
  }

  getUniqueDatabases() {
    const allDatabases = flatMap(this.capabilities, capability => capability.databases);
    return uniqBy(allDatabases, 'originalName');
  }

  populateDatabasesAndRegions(capability, plan, status) {
    const configurations = get(plan, 'configurations');
    each(configurations, (conf) => {
      if (conf.name === 'dbms') {
        const databases = EnterpriseCloudDatabaseCreateCtrl
          .getUniqueDatabasesAndVersions(get(conf, 'values'), status);
        set(capability, 'databases', databases, []);
      } else if (conf.name === 'region') {
        set(capability, 'regions', get(conf, 'values'), []);
      }
    });
    this.updateDatabasePlanMap(capability, capability);
  }

  updateDatabasePlanMap(capability) {
    const databases = get(capability, 'databases');
    const regions = get(capability, 'regions');
    each(databases, (db) => {
      const dbName = db.originalName;
      if (!this.databasePlanMap[dbName]) {
        this.databasePlanMap[dbName] = {};
      }
      const dbPlanMap = this.databasePlanMap[dbName];
      each(regions, (region) => {
        if (!dbPlanMap[region]) {
          dbPlanMap[region] = {
            clusters: [],
          };
        }
        const clusters = get(dbPlanMap[region], 'clusters', []);
        if (!includes(clusters, capability.name)) {
          clusters[clusters.length] = capability;
        }
      });
    });
  }

  onDatabaseSelect(database) {
    const regions = keys(this.databasePlanMap[database.originalName]);
    this.regions = toArray(regions);
  }

  onRegionSelect(region) {
    const databaseName = this.enterpriceDb.database.originalName;
    const regionMap = this.databasePlanMap[databaseName][region];
    this.clusters = regionMap.clusters;
    this.clusters = sortBy(this.clusters, cluster => cluster.memory.size);
  }

  orderDatabaseCluster() {
    this.order = true;
    console.log(this.enterpriceDb);
  }

  static getUniqueDatabasesAndVersions(databaseNames, status) {
    const databasesMap = {};
    each(databaseNames, (name) => {
      // separate name and version, postgresql-11
      const splitArray = split(name, '-');
      const dbName = head(splitArray);
      const dbVersion = last(splitArray);
      if (!databasesMap[dbName]) {
        const dbConstants = DATABASE_CONSTANTS[dbName];
        databasesMap[dbName] = {
          originalName: dbName,
          versions: [],
          isAvailable: status === 'available',
          selectedVersion: null,
          iconURL: get(dbConstants, 'iconURL', null),
          displayName: get(dbConstants, 'name', dbName),
        };
      }
      const db = databasesMap[dbName];
      if (!includes(db.versions, dbVersion)) {
        db.versions[db.versions.length] = dbVersion;
      }
    });
    const databasesArray = toArray(databasesMap);
    each(databasesArray, (db) => {
      sortBy(db.versions);
      set(db, 'selectedVersion', head(db.versions));
    });
    return databasesArray;
  }
}
