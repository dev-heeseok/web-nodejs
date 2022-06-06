const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

userSchema.pre('save', function (next) {
  // TODO. password 를 암호화 한다.
  let user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err)
        return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err)
          return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  const user = this;
  bcrypt.compare(plainPassword, user.password)
    .then((isValid) => {
      return callback(null, isValid);
    })
    .catch((err) => {
      return callback(err);
    });
}

userSchema.methods.generateToken = function (callback) {
  const user = this;

  const token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;

  user.save()
    .then((user) => callback(null, user))
    .catch((err) => callback(err))
}

module.exports = mongoose.model('User', userSchema);