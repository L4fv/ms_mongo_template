const Logger = require("../helpers/Logger");
const { validatorBookPost } = require("../validators/BookValidator");
const { validateRequest } = require("../helpers/ValidateRequest");
const {
  successResponseWithData,
  ErrorResponse
} = require("../contants/BuildResponse");

const {
  createBook,
  getBooks,
  updateBook,
  getBookById
} = require("../services/bookServices");

const { SERVER_ERROR } = require("../contants/ErrorConstant");

const createBookCtrl = async (req, res) => {
  try {
    Logger.info("createBookCtrl");
    validateRequest(req, validatorBookPost);
    console.log("pass Validation");
    if (req.body.readings.length >= 5) {
      const result = await createBook(req);

      res.send(result);
    } else {
      res.send({
        codigoRespuesta: "01",
        mensaje: "Se debe tener al menos 5 reading para realizar la operacion"
      });
    }
    // console.log("resuilt", result);
    // return successResponseWithData(res, result);
  } catch (e) {
    Logger.error(JSON.stringify(e));
    return ErrorResponse(res, e);
  }
};

const getBooksCtrl = async (req, res) => {
  try {
    Logger.info("getBooksCtrl");
    console.log("req", req.params);
    const result = await getBooks(req.params);
    console.log("result", result);
    return successResponseWithData(res, result);
  } catch (e) {
    Logger.error(JSON.stringify(e));
    return ErrorResponse(res, e);
  }
};

const updateBookCtrl = async (req, res) => {
  try {
    Logger.info("updateBookCtrl");
    return await updateBook(req, res);
  } catch (e) {
    Logger.error(JSON.stringify(e));
    return ErrorResponse(res, e);
  }
};

const getBookByIdCtrl = async (req, res) => {
  try {
    Logger.info("getBookByIdCtrl");
    return await getBookById(req, res);
  } catch (e) {
    Logger.error(JSON.stringify(e));
    return ErrorResponse(res, e);
  }
};

module.exports = {
  createBookCtrl,
  updateBookCtrl,
  getBookByIdCtrl,
  getBooksCtrl
};
