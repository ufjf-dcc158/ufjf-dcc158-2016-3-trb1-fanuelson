var http = require("http");
var url = require("url");

function start(router) {
  http.createServer(onRequest).listen(process.env.PORT);
  console.log("Ouvindo conexões na porta 8888");


  function onRequest(req, res) {
    console.log("Nova requisição");
    router.route(url.parse(req.url).pathname, req, res);
  }
}

module.exports.start = start;
