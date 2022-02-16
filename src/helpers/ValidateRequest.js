const Logger = require("./Logger");
const { REQUEST_BODY_ERROR } = require("../contants/ErrorConstant");
const BussinesError = require("../contants/BussinesError");

const { BAD_REQUEST_STATUS } = require("../contants/HttpConstants");

const validateRequest = (req, schema, payload = "body") => {
  const result = schema.validate(req[payload]);
  if (result.error) {
    throw new BussinesError({
      code: REQUEST_BODY_ERROR.code,
      httpCode: BAD_REQUEST_STATUS.code,
      messages: [REQUEST_BODY_ERROR.message],
    });
  }
};

module.exports = {
  validateRequest,
};
