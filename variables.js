const prompt = require('prompt-sync')();
var edad = parseInt(prompt("Ingrese su edad"));
if (edad>=18) {
    console.log("usted es  mayor de edad");
}else{
    console.log("usted es menor")
}