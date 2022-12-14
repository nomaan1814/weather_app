const express=require('express');
const { registerUser, loginUser, getUserProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { validation } = require('../validation/userValidation');
const router=express.Router();
router.post('/register',validation,registerUser);
router.post('/login',loginUser);
router.get('/profile',protect,getUserProfile);
router.put('/update',protect,updateProfile);
module.exports=router;