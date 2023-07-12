"use strict";

const express = require("express");
const authRouter = express.Router();

const basicAuth = require("../middleware/basic.js");
const bearerAuth = require("../middleware/bearer.js");
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret,
} = require("./handlers.js");

authRouter.post("/signup", handleSignup);
authRouter.post("/signin", basicAuth, handleSignin);
authRouter.get("/users",  handleGetUsers);
authRouter.get("/secret", bearerAuth, handleSecret);

module.exports = authRouter;
