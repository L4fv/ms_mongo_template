
exports.successResponseWithData = (res, data, msg) => {
  var resData = {
    status: true,
    message: msg ? msg : "success",
    data: data,
  };
  return res.status(200).json(resData);
};

exports.ErrorResponse = (res, err) => {

  var data = {
    status: false,
    message: err.messages,
  };
  return res.status(err.httpCode).json(data);
};

exports.notFoundResponse = (res, msg) => {
  var data = {
    status: false,
    message: msg,
  };
  return res.status(404).json(data);
};

exports.validationErrorWithData = (res, msg, data) => {
  var resData = {
    status: false,
    message: msg,
    data: data,
  };
  return res.status(400).json(resData);
};

exports.unauthorizedResponse = (res, msg) => {
  var data = {
    status: false,
    message: msg,
  };
  return res.status(401).json(data);
};
