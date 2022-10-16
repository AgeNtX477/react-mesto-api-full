/* eslint-disable linebreak-style */
class UnAuthErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = UnAuthErr;
