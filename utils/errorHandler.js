const {
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  SERVER_ERROR,
  BAD_AUTH_ERROR,
  FORBIDDEN_ERROR,
} = require('./errorCodes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_STATUS;
  }
}

class BadAuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_AUTH_ERROR;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = SERVER_ERROR;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR;
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  BadAuthError,
  ServerError,
  ForbiddenError,
};
