const readlineSync = require('readline-sync');


let X = +readlineSync.question("Subsidio para hijos en primaria: ");
let Z = +readlineSync.question("Subsidio para hijos en secundaria: ");
let Y = +readlineSync.question("Subsidio para hijos en universidad: ");

let totalNomina = 0;
let nominaHombres = 0;
let nominaMujeres = 0;
let nombreEmpleado = "";
let maxCostoEmpleado = 0;
let costoSubsidioSecundaria = 0;
let costoPasajesExtranjeros = 0;
let subsidioEstrato = 0;
let subsidioSector= 0; 
let numEmpleados = readlineSync.question("Cantidad de empleados: ");

for (let i = 1; i <= numEmpleados; i++) {
    nombreEmpleado = readlineSync.question(`Nombre del empleado ${i}: `);
    let salario = +readlineSync.question(`Salario del empleado ${i}: `);
    let estrato = +readlineSync.question(`Estrato del empleado ${i} (1, 2 o 3): `);
    let sector = readlineSync.question(`Sector del empleado ${i} (rural o urbano): `);
    let genero = readlineSync.question(`Sexo del empleado ${i} (m o f): `);

    if (estrato===1){
        subsidioEstrato = salario * 0.15;     
    }else if (estrato===2){
         subsidioEstrato = salario* 0.10; 

    }else if (estrato===3){
    subsidioEstrato = salario* 0.05;
        }
        if (sector==="rural"){
        subsidioSector =35000;
        }else{
        subsidioSector = 0; 
        }    

    
   

    
    let hijosPrimaria = +readlineSync.question("Hijos en primaria: ");
    let hijosSecundaria = +readlineSync.question("Hijos en secundaria: ");
    let hijosUniversidad =+readlineSync.question("Hijos en universidad: ");
    let subsidioHijos = X * hijosPrimaria + Z * hijosSecundaria + Y * hijosUniversidad;

    let costoEmpleado = salario + subsidioEstrato + subsidioSector + subsidioHijos;

    
    totalNomina += costoEmpleado;
    if (genero === "m") {
        nominaHombres += costoEmpleado;
    } else {
        nominaMujeres += costoEmpleado;
    }


    if (costoEmpleado > maxCostoEmpleado) {
        maxCostoEmpleado = costoEmpleado;
        costoEmpleado= nombreEmpleado;
    }

    
    costoSubsidioSecundaria += Z * hijosSecundaria;

    
    if (readlineSync.question("Extranjero? (s/n): ")=== "s") {
        costoPasajesExtranjeros += 2 * 1000; 
    }
}


console.log("1. Costo total de la nómina:", totalNomina);
console.log("2. Costo de la nómina de los hombres:", nominaHombres);
console.log("3. Costo de la nómina de las mujeres:", nominaMujeres);
console.log("4. Empleado que más dinero le cuesta:", nombreEmpleado);
console.log("5. Dinero gastado en subsidios para hijos en secundaria:", costoSubsidioSecundaria);
console.log("6. Dinero gastado en pasajes para empleados extranjeros:", costoPasajesExtranjeros);
