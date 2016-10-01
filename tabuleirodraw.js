var startTableTag = "<table/>";
var endTableTag = "</table>";

var startRowTag = "<tr>";
var endRowTag = "</tr>";

var startCellTag = "<td>";
var endCellTag = "</td>";

var circleDivString = "<div class='circle' ></div>";

var horseCodeString = "&#x2658;";

function embedWithTableTag(content) {
   return startTableTag+content+endTableTag;
}

function embedWithRowTag(content) {
   return startRowTag+content+endRowTag;
}

function embedWithCellTag(content) {
   return startCellTag+content+endCellTag;
}

function getAlias(linha, coluna) {
   return "{{l"+linha+"-c"+coluna+"}}"
}

function getCircleDivString() {
   return circleDivString;
}

function getHorseCodeString() {
   return horseCodeString;
}

function drawTabuleiro(qtdLinha, qtdColuna) {
   var result = "";
   var rows = "";
   var cells = "";
   var i = 0;
   var j = 0;
   for(i = 0; i < qtdLinha ; i++) {
      for(j = 0; j < qtdColuna; j++) {
         cells = cells + embedWithCellTag(getAlias(i, j)) + "\n";
      }
      rows = rows + embedWithRowTag(cells) + "\n";
      cells = "";
   }

   return embedWithTableTag(rows);
}

exports.drawTabuleiro = drawTabuleiro;
exports.getAlias = getAlias;
exports.getCircleDivString = getCircleDivString;
exports.getHorseCodeString = getHorseCodeString;
