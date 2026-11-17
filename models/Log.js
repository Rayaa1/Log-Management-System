class Log {
  constructor(message) {
      this.message = message;
      this.date = new Date();
  }

  getType() {
      return "LOG";
  }

  toString() {
      return `[${this.getType()}] ${this.date.toLocaleString()} - ${this.message}`;
  }
}

module.exports = Log;