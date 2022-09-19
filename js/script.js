let arrayOp = [];
let arrayNum = [];
let arrayCalc = [];
let arrayAux = [];
let aux, aux1 = 0;

var opPonto = ['+','-','*','/'];
var oper = ["+", "-", "*", "/"];

//função de inserção de valores ou operadores
function inserir(num){
                var numero = document.getElementById('resultado').innerHTML;

                //Não entrar com operador ou ponto na equação
                if (opPonto.indexOf(num)>=0 && numero == '') {
                  return;
                }

                //Não deixar dois operadores seguidos e trocar o operador se quiser
                if (oper.indexOf(num) >= 0 && oper.indexOf(numero.substr(-1,1)) >= 0) {
                  var aux3 = numero.substr(-1,1);
                  if (aux3 == num) {
                    return;
                  }
                  numero = numero.substr(0,numero.length-1);
                  console.log(numero);
                }

                //Erros com pontos
                if (num == '.') {
                  //Dois pontos seguidos
                  if (numero.substr(-1, 1) == num) {
                    return;
                  }
                  //Não deixar mais de um ponto
                  for (var i = numero.length; i >= 0; i--) {
                    if (oper.indexOf(numero[i]) >= 0) {
                      break;
                    }
                    if (numero[i] == ".") {
                      return;
                    }
                  }
                }

                document.getElementById('resultado').innerHTML = numero + num;
}

//função que apaga toda o calculo
function apagar(){
           document.getElementById('resultado').innerHTML = "";
           arrayOp = [];
           arrayNum = [];
           arrayCalc = [];
}

//função que apagar apenas um digito
function voltar(){
           var resultado = document.getElementById('resultado').innerHTML;
           document.getElementById('resultado').innerHTML = resultado.substring(0, resultado.length -1);
           arrayCalc = [];
}

//função para colocar a equação dentro de arrays para utilizar no metodo calculo
function colocarArray(str) {
           //adiciona os operadores dentro da arrayOp e filtro para apagar as posições vazias
           arrayOp = str.split(/[(0-9)|(.)]/);
           arrayOp = arrayOp.filter(item => item != '');

           //adiciona apenas os numeros dentro da arrayNum
           arrayNum = str.split(/[^(0-9)|.]/);
           for (var i = 0; i < arrayNum.length || arrayOp.lenght; i++) {
               if (arrayNum[i] == '') {
                 break;
               }
               arrayCalc.push(parseFloat(arrayNum[i]));
               arrayCalc.push(arrayOp[i]);
           }
           arrayCalc = arrayCalc.filter(item => item != undefined);
}

function calcularTudo() {
            //Realizar os calculos
            if (arrayNum.length >= 2 || arrayNum.length <= 4) {
                  //Prioridade para multiplicação e divisão
                  for (var i = 0; i < arrayCalc.length; i++) {
                      do {
                        if (arrayCalc[i] === "*") {
                          aux1 = arrayCalc[i-1] * arrayCalc[i+1];
                          aux1 = aux1.toFixed(2);
                          arrayCalc.splice(i-1,3, aux1);
                        } else if (arrayCalc[i] === "/") {
                          aux1 = arrayCalc[i-1] / arrayCalc[i+1];
                          aux1 = aux1.toFixed(2);
                          arrayCalc.splice(i-1,3, aux1);
                        }
                      } while (arrayCalc[i] === "*" || arrayCalc[i] === "/")
                   }
                   //Faz o resto da equação para adição e subtração
                   for (var i = 0; i < arrayCalc.length; i++) {
                     do {
                       if (arrayCalc[i] === "+") {
                         aux1 = parseFloat(arrayCalc[i-1]) + parseFloat(arrayCalc[i+1]);
                         arrayCalc.splice(i-1,3, aux1);
                       } else if (arrayCalc[i] === "-") {
                         aux1 = arrayCalc[i-1] - arrayCalc[i+1];
                         arrayCalc.splice(i-1,3, aux1);
                       }
                     } while (arrayCalc[i] === "+" || arrayCalc[i] === "-")
                   }
                }
              document.getElementById('resultado').innerHTML = arrayCalc;
}

//função de quando clicar no igual("=")
function calcular(){
           arrayCalc = [];
           var resultado = document.getElementById('resultado').innerHTML;
           colocarArray(resultado);
           calcularTudo();

           //com eval (se utilizar, comente a função calcularTudo e colocarArray)
         /*if(resultado)
           {
               document.getElementById('resultado').innerHTML = eval(resultado);
           }
           else
           {
               document.getElementById('resultado').innerHTML = ""
           }*/
 }
