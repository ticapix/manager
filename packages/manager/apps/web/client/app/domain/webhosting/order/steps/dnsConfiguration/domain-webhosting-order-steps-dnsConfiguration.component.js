import controller from './domain-webhosting-order-steps-dnsConfiguration.controller';
import template from './domain-webhosting-order-steps-dnsConfiguration.html';

export default {
  controller,
  name: 'ovhManagerWebDomainWebhostingOrderStepsDnsConfiguration',
  require: {
    stepper: '^ovhManagerWebDomainWebhostingOrderSteps',
  },
  template,
};
