const {check,validationResult}=require('express-validator');
module.exports.validation=[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter password with min. 6 characters').isLength({min:6})
]