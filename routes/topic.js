var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');
const template = require('../lib/template');
const sanitizeHtml = require('sanitize-html');

router.get('/create', (req, res) => {
  var title = 'create';
  var list = template.list(req.list);
  var html = template.HTML(
    title,
    list,
    `<form action="/topic/create_process" method="post">
        <p>
          <input type="text" name="title" placeholder="title">
        </p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>`,
    '');

  res.send(html);
});

router.post('/create_process', (req, res) => {
  const post = req.body;
  const title = post.title;
  const description = post.description;
  console.log('title : ', title);
  console.log('description : ', description);

  fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
    res.writeHead(302, { Location: `/topic/${title}` });
    res.end();
  })
});

router.get('/update/:pageid', (req, res, next) => {
  var filteredId = path.parse(req.params.pageid).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
    if (err) {
      next(err);
    } else {
      var title = req.params.pageid;
      var list = template.list(req.list);
      var html = template.HTML(title, list,
        `
          <form action="/topic/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p>
              <input type="text" name="title" placeholder="title" value="${title}">
            </p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
        `
        <a href="/topic/create">create</a>
        <a href="/topic/${title}">update</a>
        `
      );
      res.writeHead(200);
      res.end(html);
    }
  });
});

router.post('/update_process', (req, res) => {
  const post = req.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function (error) {
    fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
      res.redirect(`/topic/${title}`);
    })
  });
});

router.post('/delete_process', (req, res) => {
  const post = req.body;
  const id = post.id;
  const filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function (error) {
    res.redirect('/');
  })
});

// QueryString => Path 변경 
router.get('/:pageId', (req, res, next) => {
  console.log('/topic/:pageId error', req.param.pageId);
  let filteredId = path.parse(req.params.pageId).base;
  fs.readFile(`./data/${filteredId}`, `utf8`, (err, description) => {
    if (err) {
      next(err);
    } else {
      let title = req.params.pageId;
      let sanitizedTitle = sanitizeHtml(title);
      let sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ['h1']
      });

      var list = template.list(req.list);
      var html = template.HTML(
        sanitizedTitle,
        list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        `<a href="/topic/create">create</a>
        <a href="/topic/update/${sanitizedTitle}">update</a>
        <form action="/topic/delete_process" method="post">
          <input type="hidden" name="id" value="${sanitizedTitle}">
          <input type="submit" value="delete">
        </form>`
      );

      res.send(html);
    }
  });
});

module.exports = router;