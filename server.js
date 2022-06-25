const express = require('express');
const app = express();

const { auth } = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const configOption = require('./config/configOption');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public/build')));

console.log(configOption);

mongoose.connect(configOption.mongoURI, { dbName: "health-record" })
  .then(() => console.log('MongoDB connected ...'))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.get('/', (req, res) => res.send("Hello World!"));
app.post('/api/users/register', (req, res) => {
  console.log('post /api/user/register');
  console.log(req.body);

  // TODO. 회원가입 시 필요한 정보를 가지고 MongoDB 에 저장한다.
  const user = new User(req.body);
  user.save((err, user) => {
    console.log(err);
    console.log(user);
    return err ?
      res.json({ success: false, err }) :
      res.status(200).json({ success: true });
  });
});
app.post('/api/users/login', (req, res) => {
  console.log('post /api/user/login');
  console.log(req.body);

  User.findOne({ email: req.body.email })
    .then((user) => {
      user.comparePassword(req.body.password, (err, isValid) => {
        if (!isValid)
          return res.json({
            loginSuccess: false,
            message: "incorrect password"
          });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          res
            .cookie('x_auth', user.token)
            .status(200)
            .json({ loginSuccess: true, userID: user._id });


        });
      });
    })
    .catch((err) => {
      return res.json({
        loginSuccess: false,
        message: "not found email"
      })
    });
});
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    idAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  console.log("logout start");
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });

    return res.status(200).send({ success: true });
  });
});

const DEFAULT_PORT = 4000;
const connectedPort = process.env.SERVER_PORT || DEFAULT_PORT;
app.listen(connectedPort, () => console.log('Server is running ( PORT:', connectedPort, ")"))