const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  
  return jwt.sign({ id }, "nomgh12345");
};
module.exports = generateToken;
