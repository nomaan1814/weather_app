const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const User=require('../models/userModel')
const protect = asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token,"nomgh12345");
      req.user=await User.findById(decode.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized token");
    }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});
module.exports = { protect };
