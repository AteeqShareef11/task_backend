const express = require("express");
const authRouter = express.Router();

const { loginUser } = require("../controller/user");

authRouter.post("/login", loginUser);

module.exports = authRouter;
