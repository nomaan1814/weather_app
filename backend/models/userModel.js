const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      },
      createdAt:{
        type:Date,
        default:Date.now
      }
})
userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
  };
  userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
      next();
    }
      const salt=await bcrypt.genSalt(10);
      this.password=await bcrypt.hash(this.password,salt)
  })
const userModel=mongoose.model('User',userSchema);

module.exports=userModel;