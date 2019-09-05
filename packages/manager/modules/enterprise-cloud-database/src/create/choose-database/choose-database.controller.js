export default class {
  constructor($timeout) {
    'ngInject';

    this.$timeout = $timeout;
  }

  $onInit() {
    this.selectedDatabase = this.enterpriceDb.database;
  }

  onDatabaseSelect(database) {
    this.selectedDatabase = database;
    this.enterpriceDb.database = database;
    if (this.onChange) {
      this.$timeout(() => this.onChange({
        database: this.selectedDatabase,
      }));
    }
  }

  onVersionChange() {
    this.onDatabaseSelect(this.selectedDatabase);
  }
}
