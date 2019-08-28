import find from 'lodash/find';

import {
  COMMANDS, COMMANDS_LIST,
  ENDPOINT_TYPES, PARAMETERS,
} from './flags.constants';

export default class {
  /* @ngInject */
  constructor() {
    this.COMMANDS_LIST = COMMANDS_LIST;
    this.PARAMETERS = PARAMETERS;
  }

  $onInit() {
    this.endpoint = find(this.endPoints, { name: ENDPOINT_TYPES.READ_WRITE });
    this.connectionString = `PGPASSWORD=${this.PARAMETERS.MASKED_PASSWORD} ${COMMANDS[this.clusterType][this.command]} -U ${this.PARAMETERS.USERNAME} -h ${this.endpoint.fqdn} -p ${this.endpoint.port} -d ${this.PARAMETERS.DATABASE} --set=sslmode=${this.PARAMETERS.SSL_MODE}`;
    this.restoreString = `PGPASSWORD=${this.PARAMETERS.MASKED_PASSWORD} ${COMMANDS[this.clusterType][this.command]} -U ${this.PARAMETERS.USERNAME} -h ${this.endpoint.fqdn} -p ${this.endpoint.port} -d ${this.PARAMETERS.DATABASE} <local-dump-path>`;
  }
}
