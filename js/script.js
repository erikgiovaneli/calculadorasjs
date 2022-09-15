let arrayOp = [];
let arrayNum = [];
let arrayCalc = [];
let arrayAux = [];
let aux, aux1 = 0;

//função de inserção de valores ou operadores
function inserir(num){
                var numero = document.getElementById('resultado').innerHTML;
                console.log(numero);

                for (var i = 0; i < numero.length; i++) {
                  console.log(numero[i]);
                  if (num === '+' || num === '-' || num === '*' || num === '/') {
                    if (numero[i] === '+' || numero[i] === '-' || numero[i] === '*' || numero[i] === '/') {
                      return;
                    }
                  }
                }

                document.getElementById('resultado').innerHTML = numero + num;

                //console.log(num);
                //console.log(numero);

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
          //Tratamento de pontos no começo e meio da equação
          for (var i = 0; i < str.length; i++) {
            if (str[i] === '.' && str[i-1] !== '0123456789' ) {
              document.getElementById('resultado').innerHTML = "";
              return;
            } else if (str[i] === '0123456789' && str[i+1] === '.'){
                if (str[i+2] === '.') {
                document.getElementById('resultado').innerHTML = "";
                return;
                }
            }
           }
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

           //Verificação se começa ou termina a equação com operador
           var ult = arrayCalc.at(-1);
           if (ult === '*' || ult === '/' || ult === '-' || ult === '+') {
            arrayCalc = [];
            document.getElementById('resultado').innerHTML = "";
            return;
          } else if (arrayCalc[0] === '+-*/') {
            arrayCalc = [];
            document.getElementById('resultado').innerHTML = "";
            return;
          }

           arrayCalc = arrayCalc.filter(item => item != undefined);
}

function calcularTudo() {
            //Tratamento de um ou mais operadores
            for (var i = 0; i < arrayOp.length; i++) {
              if (arrayOp[i] === '+' || arrayOp[i] === '-' || arrayOp[i] === '/' || arrayOp[i] === '*') {
                //console.log(arrayOp);
              } else {
                arrayCalc= [];
                document.getElementById('resultado').innerHTML = "";
              }
            }


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

           /*com eval (se utilizar, comente a função calcularTudo e colocarArray)
           if(resultado)
           {
               document.getElementById('resultado').innerHTML = eval(resultado);
           }
           else
           {
               document.getElementById('resultado').innerHTML = ""
           }*/
 }
