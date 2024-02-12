/* Enunciado:

Una empresa transporta diferentes tipos de mercancia, patines, elefantes...etc.
La empresa realiza diferentes fletes cuyo valor depende de las dimensiones de la mercancia. 
Por ejemplo, las dimensiones de un elefante son mayores a las de unos patines, por lo tanto el costo es diferente
implicando un costo mayor para transportar el elefante.

La empresa lo ha contratado a usted para realizar un programa que le permita ingresar
las dimensiones de los productos a transportar. En base a esto, la empresa desea conocer:

el calculo de las dimensiones se hace multiplicando el largo * ancho * profundidad del paquete
El costo del producto se calcula segun las dimensiones, en centimetros, cada centrimetro cuesta $100 el transporte

Cada producto tiene un impuesto segun las dimensiones, asi:

1. Productos mayores a 1000 cm cubicos, tienen un impuesto del 10%
2. Productos mayores a 10000 cm cubicos, tienen un impuesto del 20%


1. Costo total del flete
2. Cual es el producto de mayores dimensiones
3. Promedio del costo de productos en el flete incluyendo impuestos
4. La empresa necesita saber cuanto debe pagar de impuestos por el flete

Ejemplo:
    Empaque 1:
        ancho: 50
        alto: 100
        profundidad: 15
    Empaque 2:
        ancho: 3
        alto: 5
        profundidad: 1
    Empaque 3:
        ancho: 15
        alto: 3
        profundidad: 13

1. Costo total del flete
    (50*100*15*100 + impuestos) + (3*5*1*100 + impuestos) + (15*3*13*100 + impuestos)
    (7500000 + 1500000) + (1500 + 150) + (58500 + 11700) = 9071850
    R: 9071850

2. Cual es el producto de mayores dimensiones
    R: El producto de mayores dimensiones es el producto: 1

3. Promedio del costo de productos en el flete
    ((7500000 + 1500000) + (1500 + 150) + (58500 + 11700))/3 = 3023950
    R: 3023950

4. La empresa necesita saber cuanto debe pagar de impuestos por el flete
    1500000 + 150 + 11700 = 1511850*/
const readlineSync = require('readline-sync');

let cantidadDeEmpaques = +readlineSync.question("Cuántos empaques deseas agregar: ");
let totalDimensiones = 0;
let totalImpuestos = 0;
let totalDelFlete = 0;
let promedioDelCostoDeProductos = 0;
let mayorDimensiones = 0;

for (let i = 1; i <= cantidadDeEmpaques; i++) {
    var anchoDelPaquete = +readlineSync.question(`Cual es el ancho del paquete ${i} en cm: `);
    var alturaPaquete = +readlineSync.question(`Ingrese la altura del paquete ${i} en cm: `);
    var profundidadDelPaquete = +readlineSync.question(`Cual es la profundidad del paquete ${i} en cm: `);

    let calculoDeDimensiones = anchoDelPaquete * alturaPaquete * profundidadDelPaquete * 100;
    totalDelFlete += calculoDeDimensiones;

    let impuestosDelPaquete = 0;

    if (calculoDeDimensiones > 10000) {
        impuestosDelPaquete = calculoDeDimensiones * 0.20;
    } else if (calculoDeDimensiones > 1000) {
        impuestosDelPaquete = calculoDeDimensiones * 0.1;
    }

    totalImpuestos += impuestosDelPaquete;

    if (calculoDeDimensiones > mayorDimensiones) {
        mayorDimensiones = calculoDeDimensiones;
        numeroMayorDimension = i;
    }
}

totalDimensiones = totalDelFlete + totalImpuestos;
promedioDelCostoDeProductos = (totalDelFlete + totalImpuestos) / cantidadDeEmpaques;

console.log(`1. El precio total del flete es: ${totalDimensiones}`);
console.log(`2. El producto de mayores dimensiones es:  Paquete ${numeroMayorDimension} `);
console.log(`3. El promedio total del costo de los productos es: ${promedioDelCostoDeProductos}`);
console.log(`4. La empresa debe pagar un total de ${totalImpuestos} en impuestos.`);