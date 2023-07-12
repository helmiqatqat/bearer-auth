"use strict";

const base64 = require("base-64");
const { users } = require("../models/index.js");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }

  let basic = req.headers.authorization.split(' ').pop();
  let [username, password] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(username, password);
    next();
  } catch (error) {
    res.status(403).send('Invalid Login');
  }
};

function _authError() {
  res.status(401).send('Unauthorized');
}
