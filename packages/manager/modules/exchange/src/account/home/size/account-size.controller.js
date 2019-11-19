export default class {
  $onInit() {
    this.bindings = {
      used: {
        rawValue: this.used * 1024,
      },
      total: {
        rawValue: this.total * 1024 * 1024 * 1024,
      },
    };

    this.bindings.used.fileSize = filesize(this.bindings.used.rawValue, { output: 'object', standard: 'iec' });
    this.bindings.used.symbol = this.bindings.used.fileSize.symbol;
    this.bindings.used.value = this.bindings.used.fileSize.value;

    this.bindings.total.fileSize = filesize(this.bindings.total.rawValue, { output: 'object', standard: 'iec' });
    this.bindings.total.symbol = this.bindings.total.fileSize.symbol;
    this.bindings.total.value = this.bindings.total.fileSize.value;

    this.bindings.usagePercentage = Math.round(
      this.bindings.used.rawValue / this.bindings.total.rawValue * 100,
    );
  }
}
