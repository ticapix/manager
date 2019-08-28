export const COMMANDS = {
  postgresql: {
    connect: 'psql',
    restore: 'pg_restore',
  },
};

export const COMMANDS_LIST = {
  CONNECT: 'connect',
  RESTORE: 'restore',
};

export const ENDPOINT_TYPES = {
  READ_ONLY: 'read-only',
  READ_WRITE: 'read-write',
};

export const PARAMETERS = {
  DATABASE: 'defaultdb',
  MASKED_PASSWORD: '********',
  SSL_MODE: 'require',
  USERNAME: 'doadmin',
};

export default {
  COMMANDS,
  COMMANDS_LIST,
  ENDPOINT_TYPES,
  PARAMETERS,
};
