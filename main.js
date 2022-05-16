const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');
const path = require('path');
const template = require('./lib/template');
const sanitizeHtml = require('sanitize-html');

app.get('/', (req, res) => {
  fs.readdir('./data', (error, filelist) => {
    let title = 'Welcome';
    let description = 'Hello, Node.js';
    let list = template.list(filelist);
    let html = template.HTML(
      title,
      list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`);

    res.send(html);
  });
});

// QueryString => Path 변경 
app.get('/page/:pageId', (req, res) => {
  fs.readdir('./data', (err, filelist) => {
    let filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, `utf8`, (err, description) => {
      let title = req.params.pageId;
      let sanitizedTitle = sanitizeHtml(title);
      let sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ['h1']
      });

      var list = template.list(filelist);
      var html = template.HTML(
        sanitizedTitle,
        list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        `<a href="/create">create</a>
        <a href="/update/${sanitizedTitle}">update</a>
        <form action="/delete_process" method="post">
          <input type="hidden" name="id" value="${sanitizedTitle}">
          <input type="submit" value="delete">
        </form>`
      );

      res.send(html);
    });
  })
});

app.get('/create', (req, res) => {
  fs.readdir('./data', (error, filelist) => {
    var title = 'create';
    var list = template.list(filelist);
    var html = template.HTML(
      title,
      list,
      `<form action="/create_process" method="post">
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
});

app.post('/create_process', (req, res) => {
  var body = '';
  req.on('data', function (data) {
    body = body + data;
  });
  req.on('end', function () {
    const post = new URLSearchParams(body);
    const title = post.get("title");
    const description = post.get("description");
    console.log('title : ', title);
    console.log('description : ', description);

    fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
      res.writeHead(302, { Location: `/page/${title}` });
      res.end();
    })
  });
});

app.get('/update/:pageid', (req, res) => {
  fs.readdir('./data', function (error, filelist) {
    var filteredId = path.parse(req.params.pageid).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
      var title = req.params.pageid;
      var list = template.list(filelist);
      var html = template.HTML(title, list,
        `
        <form action="/update_process" method="post">
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
        `<a href="/create">create</a> <a href="/page/${title}">update</a>`
      );
      res.writeHead(200);
      res.end(html);
    });
  });
});

app.post('/update_process', (req, res) => {
  var body = '';
  req.on('data', function (data) {
    body = body + data;
  });
  req.on('end', function () {
    var post = new URLSearchParams(body);
    var id = post.get("id");
    var title = post.get("title");
    var description = post.get("description");
    fs.rename(`data/${id}`, `data/${title}`, function (error) {
      fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
        res.redirect(`/page/${title}`);
      })
    });
  });
});

app.post('/delete_process', (req, res) => {
  var body = '';
  req.on('data', function (data) {
    body = body + data;
  });
  req.on('end', function () {
    const post = new URLSearchParams(body);
    const id = post.get("id");
    const filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function (error) {
      res.redirect('/');
    })
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});