import head from 'lodash/head';
import { PG_SQL_ICON, MARIA_DB_ICON } from './choose-database.constants';

export default class {
  constructor() {
    this.PG_SQL_ICON = PG_SQL_ICON;
    this.MARIA_DB_ICON = MARIA_DB_ICON;
  }

  $onInit() {
    this.initializeMockData();
  }

  initializeMockData() {
    this.databases = [
      {
        id: 'PostgresSQL',
        name: 'PostgresSQL',
        versions: [11, 12],
        isAvailable: true,
        iconURL: this.PG_SQL_ICON,
      },
      {
        id: 'MariaDB',
        name: 'MariaDB',
        versions: [1.1, 1.2],
        isAvailable: false,
        iconURL: this.MARIA_DB_ICON,
      },
      {
        id: 'Redis',
        name: 'Redis',
        versions: [1.1, 1.2],
        isAvailable: false,
      },
    ];
    this.selectedDatabase = head(this.databases);
  }

  onDatabaseSelect(database) {
    this.selectedDatabase = database;
    this.enterpriceDb.database = database;
  }
}
