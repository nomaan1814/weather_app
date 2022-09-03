const { check, validationResult } = require("express-validator");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
module.exports.registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ errors: [{ msg: "User already exist" }] });
    }
    const user = userModel.create({ name, email, password });
    res.status(201).json({
      success: true,
      msg: "User registered",
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token=generateToken(user._id);
      
      res.status(201).json({
        success:true,
        user,
        token,
      });
    } else {
      res.status(401).json({
        errors: [{ msg: "Invalid credentials" }],
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
module.exports.getUserProfile = asyncHandler(async (req, res) => {
  const user=await userModel.findById(req.user._id);
  if(user){
    res.json({
      user
    })
  }
  else{
    res.status(404).json({
      errors: [{ msg: "User not found" }],
    })
  }
});
module.exports.updateProfile=asyncHandler(async(req,res)=>{
  const user=await userModel.findById(req.user._id);
  if(user){
    user.name=req.body.name||user.name;
    user.email=req.body.email||user.email;
    if(req.body.password){
      user.password=req.body.password
    }
    const updateuser=await user.save();
    res.json({ _id: updateuser._id,
       user:updateuser,
      token: generateToken(updateuser._id),
    });
  } else {
    res.status(401).json({
      errors: [{ msg: "User not found" }],
    })
  }
})
