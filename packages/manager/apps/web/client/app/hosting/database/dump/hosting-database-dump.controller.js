import clone from 'lodash/clone';
import findIndex from 'lodash/findIndex';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

angular.module('App').controller(
  'DatabaseDumpsCtrl',
  class DatabaseDumpsCtrl {
    constructor(
      $scope,
      $q,
      $stateParams,
      $translate,
      $window,
      Alerter,
      HostingDatabase,
    ) {
      this.$scope = $scope;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.$translate = $translate;
      this.$window = $window;
      this.alerter = Alerter;
      this.hostingDatabase = HostingDatabase;
    }

    $onInit() {
      this.statusToWatch = ['start', 'doing', 'done', 'error'];

      forEach(this.statusToWatch, (state) => {
        this.$scope.$on(
          `database.dump.restore.poll.${state}`,
          this[`onDataBaseDumpRestore${state}`].bind(this),
        );
        this.$scope.$on(
          `database.dump.delete.poll.${state}`,
          this[`onDataBaseDumpDelete${state}`].bind(this),
        );
      });

      this.loadDumps();
    }

    loadDumps() {
      this.databaseDumps = undefined;

      return this.hostingDatabase
        .getDumpIds(this.$stateParams.productId, this.$scope.bdd.name)
        .then((dumpIds) => dumpIds.map((id) => ({ id })))
        .then((databaseDumps) => {
          this.databaseDumps = databaseDumps;
          return databaseDumps;
        })
        .catch((err) =>
          this.alerter.alertFromSWS(
            this.$translate.instant('hosting_tab_databases_dumps_error_fetch'),
            err,
            this.$scope.alerts.main,
          ),
        );
    }

    transformItem(item) {
      if (item.transformed) {
        return this.$q((resolve) => resolve(item));
      }
      return this.hostingDatabase
        .getDump(this.$stateParams.productId, this.$scope.bdd.name, item.id)
        .then((originalDump) => {
          const dump = clone(originalDump);

          dump.transformed = true;
          return dump;
        });
    }

    goTo(page, target) {
      this.$window.open(page, target);
    }

    onDataBaseDumpDeletestart(evt, task, dump) {
      this.findItemIndex(dump.id).then((idx) => {
        if (idx >= 0) {
          this.databaseDumps[idx].waitDelete = true;
        }
      });

      this.alerter.success(
        this.$translate.instant('database_tabs_dumps_delete_start'),
        this.$scope.alerts.main,
      );
    }

    onDataBaseDumpDeletedoing() {
      this.alerter.success(
        this.$translate.instant('database_tabs_dumps_delete_in_progress'),
        this.$scope.alerts.main,
      );
    }

    onDataBaseDumpDeletedone() {
      this.loadDumps();
      this.alerter.success(
        this.$translate.instant('database_tabs_dumps_delete_success'),
        this.$scope.alerts.main,
      );
    }

    onDataBaseDumpDeleteerror(dump) {
      if (get(dump, 'id')) {
        this.findItemIndex(dump.id).then((idx) => {
          if (idx !== -1) {
            delete this.databaseDumps[idx].waitDelete;
            this.alerter.error(
              this.$translate.instant('database_tabs_dumps_delete_fail'),
              this.$scope.alerts.main,
            );
          }
        });
      }
    }

    onDataBaseDumpRestorestart(evt, task, dump) {
      this.$scope.bdd.waitRestore = true;

      this.findItemIndex(dump.id).then((idx) => {
        this.databaseDumps[idx].waitRestore = true;
        this.alerter.success(
          this.$translate.instant('database_tabs_dumps_restore_start'),
          this.$scope.alerts.main,
        );
      });
    }

    onDataBaseDumpRestoredoing() {
      this.alerter.success(
        this.$translate.instant('database_tabs_dumps_restore_in_progress'),
        this.$scope.alerts.main,
      );
    }

    onDataBaseDumpRestoredone() {
      delete this.$scope.bdd.waitRestore;

      this.databaseDumps.forEach((dump) => {
        // eslint-disable-next-line no-param-reassign
        delete dump.waitRestore;
      });
      this.alerter.success(
        this.$translate.instant('database_tabs_dumps_restore_success'),
        this.$scope.alerts.main,
      );
    }

    onDataBaseDumpRestoreerror(dump) {
      this.$scope.bdd.waitRestore = null;

      if (dump && dump.id) {
        this.findItemIndex(dump.id).then((idx) => {
          this.databaseDumps[idx].waitRestore = null;
          this.alerter.error(
            this.$translate.instant('database_tabs_dumps_restore_fail'),
            this.$scope.alerts.main,
          );
        });
      }
    }

    findItemIndex(dumpId) {
      const deferred = this.$q.defer();
      let unregisterWatch = null;

      const todo = () => {
        const idx = findIndex(this.databaseDumps, (dump) => dump.id === dumpId);

        if (idx >= 0) {
          deferred.resolve(idx);

          if (unregisterWatch) {
            unregisterWatch();
          }
        }
      };

      if (!isEmpty(this.databaseDumps)) {
        todo();
      } else {
        unregisterWatch = this.$scope.$watch(
          angular.bind(this, () => this.databaseDumps.length),
          todo,
        );
      }

      return deferred.promise;
    }
  },
);
