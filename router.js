var handlers = require("./requestHandlers");

var reqMap = {
  "": handlers.hello,
  "/": handlers.hello,
  "/index.html": handlers.hello,
  "/sobre.html": handlers.sobre,
  "/aleatorios.html": handlers.aleatorios,
  "/primos.html": handlers.primos,
  "/equacao.html": handlers.equacao,
  "/xadrez.html": handlers.xadrez,
  "/xadrez.css":handlers.xadrezcss,
  "/xadrez.json":handlers.xadrezjson
};

function route(caminho, req, res) {
  console.log("Acesso a:" + caminho);
  if(reqMap[caminho]) {
    reqMap[caminho](req, res);
  } else {
    handlers.notFound(req, res);
  }
}

module.exports.route = route;
