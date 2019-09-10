import PG_SQL from '../assets/postgreSQL.svg';
import MARIA_DB from '../assets/mariadb.svg';

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

export const COMMITMENT_PERIODS = [1, 3, 6, 12];
export const PAYMENT_TYPES = [
  {
    name: 'monthly',
    monthly: true,
  },
  {
    name: 'one_time',
    monthly: false,
  },
];

export default {
  DATABASE_CONSTANTS,
  COMMITMENT_PERIODS,
  PAYMENT_TYPES,
};
