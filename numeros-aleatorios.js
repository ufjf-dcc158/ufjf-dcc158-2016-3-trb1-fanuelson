function getNumerosAleatorios() {
   var numerosAleatorios = {};
   numerosAleatorios.pares = [];
   numerosAleatorios.impares = [];
   for(var i = 0; i < 8 ; i++) {
      var numRandom = getRandomEntre(0, 100);
      if(isPar(numRandom)){
         numerosAleatorios.pares.push(numRandom);
      } else {
         numerosAleatorios.impares.push(numRandom);
      }
   }
   return numerosAleatorios;
}

function getRandomEntre(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isPar(num) {
   return num % 2 == 0;
}

exports.getNumerosAleatorios = getNumerosAleatorios;
