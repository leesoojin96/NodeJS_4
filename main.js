var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var templete = require('./lib/templete.js');
var path = require('path');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryDate = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
      if (queryDate.id === undefined) {
         fs.readdir('data',function (error, fileList) {
           var title = 'Welcome!';
           var description = 'Hello, Node.JS!';

           // 만든 객체를 활용
           var list = templete.List(fileList);
           var html = templete.Html(title, list, `
             <h2>${title}</h2>${description}`,
             `<a href="/create">Create</a>`
           );
           response.writeHead(200);
           response.end(html);
         })
      } else {
        fs.readdir('data',function (error, fileList) {

        // password.js에 있는 아이디와 비밀번호를 감춘다
        var filteredId = path.parse(queryDate.id).base;
        fs.readFile(`data/${filteredId}`,'utf8',function (err, description) {
          var title = queryDate.id;
          var list = templete.List(fileList);
          var html = templete.Html(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">Create</a>
           <a href="/update?id=${title}">Update</a>
           <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <input type="submit" value="Delete">
           </form>
           `);
          response.writeHead(200);
          response.end(html);
        });
       });
      }
    } else if(pathname === '/create'){
      fs.readdir('data',function (error, fileList) {
        var title = 'Welcome!';
        var list = templete.List(fileList);
        var html = templete.Html(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="Title"></p>
            <p>
              <textarea name="description" placeholder="Description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>`
        ,'');
        response.writeHead(200);
        response.end(htmltemplete);
      });
    }else if (pathname === '/create_process') {
      var body = '';
      request.on('data',function (data) {
        body += data;
      });
      request.on('end',function () {
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8',function (err) {
          // 글 생성
          response.writeHead(302,{Location: `/?id=${title}`});
          response.end();
        })
      });
    } else if (pathname === '/update') {
      fs.readdir('data',function (error, fileList) {
        var filteredId = path.parse(queryDate.id).base;
      fs.readFile(`data/${filteredId}`,'utf8',function (err, description) {
        var title = queryDate.id;
        var list = templete.List(fileList);
        var html = templete.Html(title, list,
          `  <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="Title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="Description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>`,
        `<a href="/create">Create</a> <a href="/update?id=${title}">Update</a>`);
        response.writeHead(200);
        response.end(html);
      });
     });
   }else if (pathname === '/update_process') {
     var body = '';
     request.on('data',function (data) {
       body += data;
     });
     request.on('end',function () {
       var post = qs.parse(body);
       var id = post.id;
       var title = post.title;
       var description = post.description;
       // 글 수정
       fs.rename(`data/${id}`,`data/${title}`,function (error) {
         fs.writeFile(`data/${title}`, description, 'utf8',function (err) {
           response.writeHead(302,{Location: `/?id=${title}`});
           response.end();
         })
       })
     });
   }else if (pathname === '/delete_process') {
     // 글 삭제
     var body = '';
     request.on('data',function (data) {
       body += data;
     });
     request.on('end',function () {
       var post = qs.parse(body);
       var id = post.id;
       var filteredId = path.parse(id).base;
       fs.unlink(`data/${filteredId}`,function (error) {
         response.writeHead(302,{Location: `/`});
         response.end();
       })
     });
   } else {
      response.writeHead(404);
      response.end('Not Found');
    }
});
app.listen(3000);
