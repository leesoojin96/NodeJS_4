// 실행결과는 똑같으나 더 효율적으로 코드를 개선하는 것 -> 리팩토링
module.exports = {
  Html:function(title, list, body, control) {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB2 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },List:function(fileList) {
    var list = `<ul>`;
    for (var i = 0; i < fileList.length; i++) {
      list += `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
    }
    list += '</ul>';
    return list;
  }
}
