var url = require("url");
var fs = require("fs");
var tabuleirodraw = require("./tabuleirodraw");
var equacaoSegundoGrau = require("./equacao-segundo-grau");
var primoUtils = require("./primo-utils");
var numerosAleatorios = require("./numeros-aleatorios");
var qs = require("querystring");

function hello(req, res) {
   res.writeHead(200, {"Content-Type": "text/html"});
   fs.readFile("./index.html",'utf8', function(err, html){
      res.write(html);
      res.end();
   });
}

function sobre(req, res) {
   var dados = {
      nome: "Fanuel Nunes",
      matricula: "201276010",
      email: "fanuelson@gmail.com",
      curso: "Sistemas de Informacao"
   };
   var resultString = "Nome: " + dados.nome + "\n";
   resultString += "Matricula: " + dados.matricula + "\n";
   resultString += "Email: " + dados.email + "\n";
   resultString += "Curso: " + dados.curso + "\n";
   res.writeHead(200, {"Content-Type": "text/plain"});
   res.write(resultString.toString());
   res.end();
}

function aleatorios(req, res) {
   var result = "";
   var numAleatorios = numerosAleatorios.getNumerosAleatorios();
   result = "Pares: " + numAleatorios.pares + "\n";
   result = result + "Impares: " + numAleatorios.impares + "\n";
   res.writeHead(200, {"Content-Type": "text/plain"});
   res.write(result.toString());
   res.end();
}

function primos(req, res) {
   var n1 = url.parse(req.url, true).query.n1;
   var n2 = url.parse(req.url, true).query.n2;
   var exemplo = "primos.html?n1=10&n2=80"
   var result = primoUtils.getPrimosEntre(n1, n2);
   result = result ? result : "Parametros invalidos.\nEx: "+exemplo;
   res.writeHead(200, {"Content-Type": "text/plain"});
   res.write(result.toString());
   res.end();
}

function equacao(req, res) {
   if(req.method == "GET") {
      res.writeHead(200, {"Content-Type": "text/html"});
      fs.readFile("./equacao-form.html", function(err, html){
        res.write(html);
        res.end();
      });
   } else if(req.method == "POST") {
      var body = "";
      res.writeHead(200, {"Content-Type": "text/plain"});

      req.on('data',function(data){
         body = body + data;
      });

      req.on('end',function() {
         var coeficientes = qs.parse(body);
         var raizes = {};
         if(coeficientes && coeficientes.a && coeficientes.b && coeficientes.c) {
            raizes = equacaoSegundoGrau.calcRaizes(coeficientes);
         }
         res.write(JSON.stringify(raizes, null, 2));
         res.end();
      });
   }
}

function xadrez(req, res) {
   var linha = url.parse(req.url, true).query.linha;
   var coluna = url.parse(req.url, true).query.coluna;
   res.writeHead(200, {"Content-Type": "text/html"});
   fs.readFile("./xadrezTemplate.html",'utf8', function(err, html){
     var tabuleiro = html.replace("{{tabuleiroHere}}", tabuleirodraw.drawTabuleiro(8 ,8));

     if(linha && coluna) {
        var linhaInt = parseInt(linha);
        var colunaInt = parseInt(coluna);
        tabuleiro = tabuleiro.replace(tabuleirodraw.getAlias(linhaInt, colunaInt), tabuleirodraw.getHorseCodeString());

        tabuleiro = tabuleiro.replace(tabuleirodraw.getAlias(linhaInt - 2, colunaInt - 1) , tabuleirodraw.getCircleDivString());
        tabuleiro = tabuleiro.replace(tabuleirodraw.getAlias(linhaInt - 2, colunaInt + 1) , tabuleirodraw.getCircleDivString());
        tabuleiro = tabuleiro.replace(tabuleirodraw.getAlias(linhaInt + 2, colunaInt + 1) , tabuleirodraw.getCircleDivString());
        tabuleiro = tabuleiro.replace(tabuleirodraw.getAlias(linhaInt + 2, colunaInt - 1) , tabuleirodraw.getCircleDivString());
        tabuleiro = tabuleiro.replace(tabuleirodraw.getAlias(linhaInt - 1, colunaInt - 2) , tabuleirodraw.getCircleDivString());
        tabuleiro = tabuleiro.replace(tabuleirodraw.getAlias(linhaInt - 1, colunaInt + 2) , tabuleirodraw.getCircleDivString());
        tabuleiro = tabuleiro.replace(tabuleirodraw.getAlias(linhaInt + 1, colunaInt + 2) , tabuleirodraw.getCircleDivString());
        tabuleiro = tabuleiro.replace(tabuleirodraw.getAlias(linhaInt + 1, colunaInt - 2) , tabuleirodraw.getCircleDivString());

     }

     tabuleiro = tabuleiro.replace(/{{l[0-9]-c[0-9]}}/g, "");
     res.write(tabuleiro);
     res.end();
   });
}

function xadrezcss(req, res) {
   res.writeHead(200, {"Content-Type": "text/html"});
   fs.readFile("./xadrez.css", function(err, css){
     res.write(css);
     res.end();
   });
}

function xadrezjson(req, res) {
   res.writeHead(200, {"Content-Type": "application/json"});
   var linha = url.parse(req.url, true).query.linha;
   var coluna = url.parse(req.url, true).query.coluna;
   var result = [];
   if(linha && coluna) {
      var linhaInt = parseInt(linha);
      var colunaInt = parseInt(coluna);
      var cavalo = {
         cavalo: "Cavalo",
         linha: linhaInt,
         coluna: colunaInt
      };

      var possibilidade_1 = {
         possibilidade: "1",
         linha: linhaInt - 2,
         coluna: colunaInt - 1
      };
      var possibilidade_2 = {
         possibilidade: "2",
         linha: linhaInt - 2,
         coluna: colunaInt + 1
      };
      var possibilidade_3 = {
         possibilidade: "3",
         linha: linhaInt + 2,
         coluna: colunaInt + 1
      };
      var possibilidade_4 = {
         possibilidade: "4",
         linha: linhaInt + 2,
         coluna: colunaInt - 1
      };
      var possibilidade_5 = {
         possibilidade: "5",
         linha: linhaInt - 1,
         coluna: colunaInt - 2
      };
      var possibilidade_6 = {
         possibilidade: "6",
         linha: linhaInt - 1,
         coluna: colunaInt + 2
      };
      var possibilidade_7 = {
         possibilidade: "7",
         linha: linhaInt + 1,
         coluna: colunaInt + 2
      };
      var possibilidade_8 = {
         possibilidade: "8",
         linha: linhaInt + 1,
         coluna: colunaInt - 2
      };
      result.push(cavalo);
      result.push(possibilidade_1);
      result.push(possibilidade_2);
      result.push(possibilidade_3);
      result.push(possibilidade_4);
      result.push(possibilidade_5);
      result.push(possibilidade_6);
      result.push(possibilidade_7);
      result.push(possibilidade_8);
   }

   res.write(JSON.stringify(result, null, 2));
   res.end();
}

function notFound(req, res) {
  res.writeHead(404, {"Content-Type": "text/plain"});
  res.write("ERROR 404: NOT FOUND");
  res.end();
}

exports.notFound = notFound;
exports.hello = hello;
exports.sobre = sobre;
exports.aleatorios = aleatorios;
exports.primos = primos;
exports.equacao = equacao;
exports.xadrez = xadrez;
exports.xadrezcss = xadrezcss;
exports.xadrezjson = xadrezjson;
