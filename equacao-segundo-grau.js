//(-b +-( _/b^2 - 4ac/) ) )sobre 2*a ;
function calcRaizes(coeficientes) {
   var raizes = {};
   var deltas = calcDelta(coeficientes);
   if(deltas) {
      raizes.x1 = (- coeficientes.b + deltas.d1) / 2 * coeficientes.a;
      raizes.x2 = (- coeficientes.b + deltas.d2) / 2 * coeficientes.a;
   }
   return deltas ? raizes : null;
}

function calcDelta(coeficientes) {
   var deltas = {};
   var delta = Math.sqrt(Math.pow(coeficientes.b, 2) - 4*coeficientes.a*coeficientes.c);

   deltas.d1 = Math.abs(delta);
   deltas.d2 = - Math.abs(delta);

   return delta ? deltas : null;
}

exports.calcRaizes = calcRaizes;
