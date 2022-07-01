class Unathorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unathorized';
    this.statusCode = 401;
  }
}

module.exports = Unathorized;
