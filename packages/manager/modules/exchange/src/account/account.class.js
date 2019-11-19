import AccountOutlook from './outlook/account-outlook.class';

export default class {
  constructor(exchangeService, {
    accountLicense,
    deleteOutlookAtExpiration,
    expirationOutlookDate,
    outlookLicense,
    primaryEmailAccount,
    renewOutlookPeriod,
  }) {
    Object.assign(this, {
      accountLicense,
      outlookLicense,
      primaryEmailAccount,
    });

    this.outlook = new AccountOutlook(exchangeService, {
      deleteOutlookAtExpiration,
      expirationOutlookDate,
      outlookLicense,
      renewOutlookPeriod,
    });
  }
}
