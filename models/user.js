const mongoose = require("mongoose");

const {createHmac,randomBytes} = require('crypto');
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
     
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl:{
        type:String,
        default:"/public/images/default.png"
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER"
    }
  },
  {
    timestamps: true,
  }
);




userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')){
        return
    }
    const salt =  randomBytes(32).toString();
    const hashedPassword = createHmac('sha256',salt).update(this.password).digest('hex');
    this.password = hashedPassword;
    this.salt = salt;

    next()

})



userSchema.static('matchPassword', async function(email,password){
    const user = await this.findOne({email}); 
    if(!user){
        throw new Error("Invalid credentials")
    }

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac('sha256',salt).update(password).digest('hex');

    if(hashedPassword !== userProvidedHash){
        throw new Error("Invalid credentials")
    }

console.log(user);
   return user


})

module.exports = mongoose.model("User", userSchema);
