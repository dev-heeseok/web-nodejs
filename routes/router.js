const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/SignUpModels');

router.post('/signup', (request, response) => {
  console.log('connected signup');

  const signedUpUser = new signUpTemplateCopy({
    fullName: request.body.fullName,
    userName: request.body.userName,
    email: request.body.email,
    password: request.body.password,
  });

  console.log(signedUpUser);

  signedUpUser.save()
    .then(data => {
      response.json(data);
    })
    .catch(error => {
      response.json(error);
    });
})

module.exports = router;  