const express = require("express");
const router = express.Router();

const {
  getBooksCtrl,
  createBookCtrl,
  updateBookCtrl,
  getBookByIdCtrl
} = require("../controllers/BookController");

router.get("/books/:tipoFiltro/:valor", getBooksCtrl);
router.put("/books/:id", updateBookCtrl);
router.get("/books/:id", getBookByIdCtrl);
router.post("/books", createBookCtrl);

module.exports = router;
