const readlineSync = require('readline-sync');

let subsidioHijosPrimaria;
while (true) {
    subsidioHijosPrimaria = +readlineSync.question("Subsidio para hijos en primaria: ");
    if (isNaN(subsidioHijosPrimaria) && subsidioHijosPrimaria >= 0) {
        break;
    }
    console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
}

let subsidioHijosSecundaria;
while (true) {
    subsidioHijosSecundaria = +readlineSync.question("Subsidio para hijos en secundaria: ");
    if (isNaN(subsidioHijosSecundaria) && subsidioHijosSecundaria > 0) {
        break;
    }
    console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
}

let subsidioHijosUniversidad;
while (true) {
    subsidioHijosUniversidad = +readlineSync.question("Subsidio para hijos en universidad: ");
    if (isNaN(subsidioHijosUniversidad) && subsidioHijosUniversidad >= 0) {
        break;
    }
    console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
}

let totalNomina = 0;
let nominaHombres = 0;
let nominaMujeres = 0;
let nombreEmpleado = "";
let maxCostoEmpleado = 0;
let costoSubsidioSecundaria = 0;
let costoPasajesExtranjeros = 0;
let subsidioEstrato = 0;
let subsidioSector = 0;

let numEmpleados;
while (true) {
    numEmpleados = +readlineSync.question("Cantidad de empleados: ");
    if (!isNaN(numEmpleados) && numEmpleados > 0) {
        break;
    }
    console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
}

for (let i = 1; i <= numEmpleados; i++) {
    nombreEmpleado = readlineSync.question(`Nombre del empleado ${i}: `);

    let salario;
    while (true) {
        salario = +readlineSync.question(`Salario del empleado ${i}: `);
        if (isNaN(salario) && salario > 0) {
            break;
        }
        console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
    }

    let estrato;
    while (true) {
        estrato = +readlineSync.question(`Estrato del empleado ${i} (1, 2 o 3): `);
        if (isNaN(estrato) && estrato > 0 && estrato < 4) {
            break;
        }
        console.error('Ingrese alguna de las opciones válidas. Inténtelo nuevamente.');
    }

    let sector = readlineSync.question(`Sector del empleado ${i} (rural o urbano): `);
    let genero = readlineSync.question(`Sexo del empleado ${i} (m o f): `);

    if (estrato === 1) {
        subsidioEstrato = salario * 0.15;
    } else if (estrato === 2) {
        subsidioEstrato = salario * 0.10;
    } else if (estrato === 3) {
        subsidioEstrato = salario * 0.05;
    }

    if (sector === "rural") {
        subsidioSector = 35000;
    } else {
        subsidioSector = 0;
    }

    let hijosPrimaria;
    while (true) {
        hijosPrimaria = +readlineSync.question("Hijos en primaria: ");
        if (isNaN(hijosPrimaria) && hijosPrimaria >= 0) {
            break;
        }
        console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
    }

    let hijosSecundaria;
    while (true) {
        hijosSecundaria = +readlineSync.question("Hijos en secundaria: ");
        if (isNaN(hijosSecundaria) && hijosSecundaria >= 0) {
            break;
        }
        console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
    }

    let hijosUniversidad;
    while (true) {
        hijosUniversidad = +readlineSync.question("Hijos en universidad: ");
        if (isNaN(hijosUniversidad) && hijosUniversidad >= 0) {
            break;
        }
        console.error('El valor a ingresar debe ser un número positivo. Inténtelo nuevamente.');
    }

    let subsidioHijos = subsidioHijosPrimaria * hijosPrimaria + subsidioHijosSecundaria * hijosSecundaria + subsidioHijosUniversidad * hijosUniversidad;
    let costoEmpleado = salario + subsidioEstrato + subsidioSector + subsidioHijos;

    totalNomina += costoEmpleado;
    if (genero.toLowerCase() === "m") {
        nominaHombres += costoEmpleado;
    } else {
        nominaMujeres += costoEmpleado;
    }

    if (costoEmpleado > maxCostoEmpleado) {
        maxCostoEmpleado = costoEmpleado;
        nombreEmpleado = nombreEmpleado;
    }

    costoSubsidioSecundaria += subsidioHijosSecundaria * hijosSecundaria;

    if (readlineSync.question("Extranjero? (s/n): ") === "s") {
        costoPasajesExtranjeros += 2 * 1000;
    }
}

console.log("1. Costo total de la nómina:", totalNomina);
console.log("2. Costo de la nómina de los hombres:", nominaHombres);
console.log("3. Costo de la nómina de las mujeres:", nominaMujeres);
console.log("4. Empleado que más dinero le cuesta:", nombreEmpleado);
console.log("5. Dinero gastado en subsidios para hijos en secundaria:", costoSubsidioSecundaria);
console.log("6. Dinero gastado en pasajes para empleados extranjeros:", costoPasajesExtranjeros);
