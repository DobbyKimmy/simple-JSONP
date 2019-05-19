var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
    console.log('Please appoint the port number\n Like node server.js 8888')
    process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    var query = parsedUrl.query
    var path = parsedUrl.pathname
    if(path.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var method = request.method
    /****************************************/
    console.log('HTTP Path:\n'+path)
    if(path == '/'){
        var string = fs.readFileSync('./index.html','utf8')
        var amount = fs.readFileSync('./db','utf-8')
        string = string.replace('&amount',amount);
        response.setHeader('Content-Type','text/html;charset=utf8')
        response.write(string)
        response.end()
    }else if(path == '/style.css'){
        var string = fs.readFileSync('./style.css','utf8')
        response.setHeader('Content-Type','text/css')
        response.write(string)
        response.end()
    }else if(path==='/pay'){
        var amount = fs.readFileSync('./db','utf8')
        var newAmount = parseInt(amount) - 1;
        fs.writeFileSync('./db',newAmount);
        response.setHeader('Content-Type','application/javascript')
        response.statusCode = 200
        response.write(`
            ${query.callback}.call(undefined,'success');
        `)
        response.end()
    } else{
        response.statusCode = 404
        response.setHeader('Content-Type','text/html;charset=utf-8')
        response.write('wrong')
        response.end()
    }

    console.log(method+''+request.url)
})

server.listen(port)
console.log('Listen'+port+'Success\n Please open http://localhost:'+port)
