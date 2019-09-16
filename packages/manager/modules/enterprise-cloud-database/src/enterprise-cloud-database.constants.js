import PG_SQL from './assets/postgreSQL.svg';
import MARIA_DB from './assets/mariadb.svg';

export const OFFERS = {
  cluster16: 'Cluster 16',
  cluster32: 'Cluster 32',
  cluster64: 'Cluster 64',
  cluster128: 'Cluster 128',
};

export const PROCESSING_STATUS = [
  'creating',
  'deleting',
  'reopening',
  'restarting',
  'scaling',
  'suspending',
  'updating',
];

export const ERROR_STATUS = [
  'suspended',
];
export const SUCCESS_STATUS = [
  'created',
];

export const DATABASE_CONSTANTS = {
  postgresql: {
    name: 'PostgresSQL',
    iconURL: PG_SQL,
  },
  mariadb: {
    name: 'MariaDB',
    iconURL: MARIA_DB,
  },
};

export const MASKED_PASSWORD = '********';
export const GUIDELINK = 'https://docs.ovh.com/';
export const DELETE_CONFIRMATION_INPUT_PATTERN = /^DELETE$/;

export default {
  DATABASE_CONSTANTS,
  DELETE_CONFIRMATION_INPUT_PATTERN,
  ERROR_STATUS,
  GUIDELINK,
  MASKED_PASSWORD,
  PROCESSING_STATUS,
  OFFERS,
  SUCCESS_STATUS,
};
