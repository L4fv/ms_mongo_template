const Logger = require("../helpers/Logger");

class BusinessError extends Error {
  constructor({
    code = undefined,
    httpCode = undefined,
    messages = {
      msg:"generic error"
    },
  }) {
    super();
    Logger.error({
      "@timestamp": new Date(),
      "@version": "1",
      message: messages.msg,
      logger_name: "node.App", // backend utilizadovariable de entorno
      thread_name: "main",
      level: "ERROR",
      level_value: 40000,
      detalleError: {
        backend: "node_template", //variable de entorno
        reason: messages.reason, // Mensaje descriptivo del error
        errorSource: messages.errorSource, // Source en error generado (Clase en Java, archivo JS en Node)
        traceError: messages.traceError,// StackTrace de la excepcion
      },
    });

    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.httpCode = httpCode;
    this.messages = messages;
  }
}

module.exports = BusinessError;
