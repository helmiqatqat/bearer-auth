"use strict";

const { users } = require("../models/index.js");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next("Invalid Login");
    }

    const token = req.headers.authorization.split(" ").pop();
    const validUser = await users.authenticateToken(token);

    if (!validUser) {
      return next("Invalid Login");
    }

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (e) {
    res.status(403).send("Invalid Login");
  }
};
