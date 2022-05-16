module.exports = {
  HTML: (title, list, body, control) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>WEB3 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB3 - ${title}</a></h1>
        ${list}
        ${control}
        ${body}
      </body>    
    </html>
    `
  },
  list: (filelist) => {
    let list = `<ul>`

    let i = 0;
    while (i < filelist.length) {
      list = list + `
      <li>
        <a href="/page/${filelist[i]}">${filelist[i]}</a>
      </li>`;

      i++;
    }
    list += `</ul>`
    return list;
  }
}