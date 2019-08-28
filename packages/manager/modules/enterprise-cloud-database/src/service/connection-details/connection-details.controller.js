import find from 'lodash/find';

import { COMMANDS_LIST, ENDPOINT_TYPES, PARAMETERS } from './flags/flags.constants';

export default class {
  /* @ngInject */
  constructor() {
    this.COMMANDS_LIST = COMMANDS_LIST;
    this.PARAMETERS = PARAMETERS;
  }

  $onInit() {
    this.endpoint = find(this.endPoints, { name: ENDPOINT_TYPES.READ_WRITE });
    this.connectionString = `${this.clusterType}://${this.PARAMETERS.USERNAME}:${this.PARAMETERS.MASKED_PASSWORD}@${this.endpoint.fqdn}:${this.endpoint.port}/${this.PARAMETERS.DATABASE}?sslmode=${this.PARAMETERS.SSL_MODE}`;
  }
}
