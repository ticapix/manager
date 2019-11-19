import { STATES } from './account-outlook.constants';

export default class {
  constructor(exchangeService, {
    deleteOutlookAtExpiration,
    expirationOutlookDate,
    outlookLicense,
    renewOutlookPeriod,
  }) {
    Object.assign(
      this,
      {
        deleteOutlookAtExpiration,
        expirationOutlookDate,
        outlookLicense,
        renewOutlookPeriod,
      },
    );

    this.canExist = exchangeService;
    this.status = this.computeStatus();
  }

  computeStatus() {
    const accountAlreadyHasLicence = this.outlook;

    if (accountAlreadyHasLicence) {
      if (
        this.exchangeSelectedService.isContractType(
          this.exchangeSelectedService.CONTRACT_TYPES.PREPAID,
        )
      ) {
        return STATES.ORDERED;
      }

      return STATES.ACTIVATED;
    }

    if (!this.Exchange.currentUserHasConfigurationRights()) {
      return STATES.CANT_ORDER_OR_ACTIVATE_LICENSE;
    }

    if (
      this.exchangeSelectedService.isContractType(
        this.exchangeSelectedService.CONTRACT_TYPES.PAY_AS_YOU_GO,
      )
    ) {
      return STATES.TO_ACTIVATE;
    }

    return STATES.TO_ORDER;
  }
}
