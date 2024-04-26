const express = require("express");
const router = express.Router();

//Controllers
const homeController = require("../controllers/homeController.js");
const productsController = require("../controllers/productsController.js");
const usersController = require("../controllers/usersController.js");

/* Route for HOME */
router.get("/", homeController.get);

/* Route for Products */
router.get("/meusProdutos", productsController.get);
router.post("/meusProdutos", productsController.create);
router.put("/meusProdutos/:id", productsController.update);
router.delete("/meusProdutos/:id", productsController.remove);

// Router for Users
router.post("/registro", usersController.create);
router.post("/login", usersController.login);

/* Route for Product serch */
router.get("/meusProdutos/:name", productsController.getByName);

module.exports = router;
