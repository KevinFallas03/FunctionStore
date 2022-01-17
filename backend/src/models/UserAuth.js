/* UserAuth schema, used to user security  */

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv/config');


const { Schema } = mongoose;
 
const UserAuthSchema = new Schema(
  {
    email: { 
        type: String, 
        required: true 
    },
    password: {
        type: String,
        required: true 
    },
    tokens: [{
    token: {
        type: String,
        required: true
    }
    }]
  },
  {
    versionKey: false, 
    timestamps: true, // createdAt and updatedAt 
  }
);
 
/*Security Methods*/

// Encrypts the password before saving it in the database
UserAuthSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password') && user.password != "") {
      user.password = await bcrypt.hash(user.password, 8);
  }
  next()
})


// Generates an authentication token
UserAuthSchema.methods.generateToken = async function () {
  console.log("estoy en generate token");
  const user = this;
  const generatedToken = jwt.sign({_id: user._id}, process.env.TOKEN_KEY);

  user.tokens = user.tokens.concat({token: generatedToken});
  
  await user.save();
  return generatedToken;
}


// Finds a specific user based on email AND password
UserAuthSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
}

const userAuth = mongoose.model("User", UserAuthSchema);

module.exports = userAuth;