var express = require('express');
var router = express.Router();
const template = require('../lib/template');

router.get('/', (req, res) => {
  let title = 'Welcome';
  let description = 'Hello, Node.js';
  let list = template.list(req.list);
  let html = template.HTML(
    title,
    list,
    `<h2>${title}</h2>
    ${description}
    <img src="/img/hello.jpg" style="width:100%">
    `,
    `<a href="/topic/create">create</a>`);

  res.send(html);
});

module.exports = router;