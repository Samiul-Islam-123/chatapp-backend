const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  avatarURL: {
    type: String,
    require: true,
  },

  contacts: [{

    username: String,
    userAvatarURL: String,
    contactID: String

  }],

  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
});

const UserModel = new mongoose.model("user", UserSchema);

module.exports = UserModel
