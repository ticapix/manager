export default class {
  $onInit() {
    this.KbPerMb = 1024;

    Object.defineProperties(this.offer, {
      _patternReseller: {
        enumerable: false,
        configurable: false,
        writable: false,
        value: /reseller/i,
      },
      isResellerOffer: {
        enumerable: true,
        configurable: false,
        get() {
          return this._patternReseller.test(this.offerCode);
        },
        set() {
          throw new Error('isResellerOffer is a read only property');
        },
      },
    });
  }

  changeOffer() {
    this.change({ OFFER: this.offer });
  }
}
