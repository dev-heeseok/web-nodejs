const User = require('../models/User');

let auth = (req, res, next) => {
  // TODO. 인증 처리
  let token = req.cookies.x_auth;
  console.log("auth : ", token);

  User.findByToken(token, function(err, user) {
    console.log("findByToken");

    if (err) throw err;
    if (!user) return res.json({ "isAuth": false, "error": true });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };