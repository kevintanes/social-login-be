const express = require("express");
const { userController } = require("../controllers");
const route = express.Router();

route.post("/register", userController.register);
route.post("/login", userController.login);
route.post("/keep-login", userController.keepLogin);
route.post('/google-login', userController.googleLogin)

module.exports = route;