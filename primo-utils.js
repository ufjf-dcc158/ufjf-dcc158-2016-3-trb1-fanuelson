
function isPrimo(num) {
   if (num == 3 || num == 5 || num == 7) {
      return true;
   } else if (num < 9) {
      return false;
   }
   for (var i = 2; i <= 9; i++) {
      if (i != num && num % i == 0)
         return false;
   }
   return true;
}

function getPrimosEntre(n1, n2) {
   if(!(n1 && n2 && n1 < n2)) {
      return null;
   }
   var primos = [];
   for(var i = n1 ; i < n2 && i < 100 ; i++) {
      if(isPrimo(i)) {
         primos.push(i);
      }
   }
   return primos;
}

exports.getPrimosEntre = getPrimosEntre;
