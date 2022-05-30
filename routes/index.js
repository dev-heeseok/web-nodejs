const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/SignUpModels');

router.use('*', (request, response, next) => {
  console.log("route time: ", Date.now());
  next();
});

router.post('/signup', (request, response) => {
  const signedUpUser = new signUpTemplateCopy({
    fullName: request.body.fullName,
    userName: request.body.userName,
    email: request.body.email,
    password: request.body.password,
  });

  console.log("sign-up: ", signedUpUser);

  signedUpUser.save()
    .then(data => {
      response.json(data);
    })
    .catch(error => {
      response.json(error);
    });
})

module.exports = router;  