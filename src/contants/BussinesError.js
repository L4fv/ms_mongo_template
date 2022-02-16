const Logger = require("../helpers/Logger");

class BusinessError extends Error {
  constructor({
    code = undefined,
    httpCode = undefined,
    messages = ["Generic Error"],
  }) {
    super();
    // String backend; // backend utilizado
    // String reason;  // Mensaje descriptivo del error
    // String errorSource; // Source en error generado (Clase en Java, archivo JS en Node)
    // String traceError; // StackTrace de la excepcion
    Logger.error({
      "@timestamp": new Date(),
      "@version": "1",
      message: messages,
      logger_name: "node.App", // backend utilizadovariable de entorno
      thread_name: "main",
      level: "ERROR",
      level_value: 40000,
      detalleError: {
        backend: "node_template", //variable de entorno
        reason: messages,
        errorSource: "App",
        traceError: messages,
      },
    });

    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.httpCode = httpCode;
    this.messages = messages;
  }
}

module.exports = BusinessError;
