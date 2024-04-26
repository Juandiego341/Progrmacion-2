const readline = require('readline-sync');

class Persona {
    
    constructor(nombre, edad, genero, regimen, ingreso, nivelSisben) {
        this.nombre = nombre; 
        this.edad = edad; 
        this.genero = genero; 
        this.regimen = regimen; 
        this.ingreso = ingreso; 
        this.nivelSisben = nivelSisben || null; 
    }

  
    calcularDescuento(costoPrueba) {
        let descuento = 0;
        if (this.nivelSisben) {
            const tasasDescuento = { 'A': 0.20, 'B1': 0.15, 'B2': 0.10 };
            descuento = costoPrueba * (tasasDescuento[this.nivelSisben] || 0);
        }
        if (this.regimen === 'contributivo' && this.ingreso > 3000) {
            descuento += costoPrueba * 0.05; // Descuento adicional para ingresos altos
        }
        return descuento;
    }
}


class Laboratorio {
    constructor(nombre) {
        this.nombre = nombre; 
        this.pruebas = []; 
    }

    agregarPrueba(prueba) {
        this.pruebas.push(prueba);
    }
}


class Prueba {
    constructor(nombre, tipo, costo) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.costo = costo;
        this.personas = [];
    }

    
    agregarPersona(persona) {
        this.personas.push(persona);
    }

    
    calcularCostoFinal() {
        let totalCosto = 0;
        let descuentosPorSisben = {};
        for (let persona of this.personas) {
            let descuento = persona.calcularDescuento(this.costo);
            let nivelSisben = persona.nivelSisben || 'ninguno';
            descuentosPorSisben[nivelSisben] = (descuentosPorSisben[nivelSisben] || 0) + descuento;
            totalCosto += this.costo - descuento;
        }
        return { totalCosto, descuentosPorSisben };
    }
}


class Farmaceutica {
    constructor() {
        this.laboratorios = []; 
    }

   
    agregarLaboratorio(laboratorio) {
        this.laboratorios.push(laboratorio);
    }

    
    calcularIngresosTotales() {
        let total = 0;
        let ingresosPorRegimen = { contributivo: 0, subsidiado: 0 };
        let ingresosPorTipo = {};
        let descuentosPorSisben = {};
        
        for (let laboratorio of this.laboratorios) {
            for (let prueba of laboratorio.pruebas) {
                let resultado = prueba.calcularCostoFinal();
                total += resultado.totalCosto;
                
                prueba.personas.forEach(persona => {
                    ingresosPorRegimen[persona.regimen] += prueba.costo - persona.calcularDescuento(prueba.costo);
                });

                ingresosPorTipo[prueba.tipo] = (ingresosPorTipo[prueba.tipo] || 0) + resultado.totalCosto;

                for (const nivel in resultado.descuentosPorSisben) {
                    descuentosPorSisben[nivel] = (descuentosPorSisben[nivel] || 0) + resultado.descuentosPorSisben[nivel];
                }
            }
        }

        return {
            total,
            ingresosPorRegimen,
            ingresosPorTipo,
            descuentosPorSisben,
            promedioIngresoPorLaboratorio: total / this.laboratorios.length
        };
    }
}


function main() {
    let farmaceutica = new Farmaceutica(); 
    let seguir = true;

    while (seguir) {
        let nombreLaboratorio = readline.question('Nombre del laboratorio: ');
        let laboratorio = new Laboratorio(nombreLaboratorio);
        farmaceutica.agregarLaboratorio(laboratorio);

        let agregarOtraPrueba = true;
        while (agregarOtraPrueba) {
            let nombrePrueba = readline.question('Nombre de la prueba: ');
            let tipoPrueba = readline.question('Tipo de prueba: ');
            let costoPrueba = parseFloat(readline.question('Costo de la prueba: '));
            let prueba = new Prueba(nombrePrueba, tipoPrueba, costoPrueba);
            laboratorio.agregarPrueba(prueba);

            let agregarOtraPersona = true;
            while (agregarOtraPersona) {
                let nombrePersona = readline.question('Nombre de la persona: ');
                let edadPersona = parseInt(readline.question('Edad de la persona: '));
                let generoPersona = readline.question('Género de la persona (m/f): ');
                let regimenPersona = readline.question('Régimen (subsidiado/contributivo): ');
                let ingresoPersona = parseFloat(readline.question('Ingreso mensual de la persona: '));
                let nivelSisben = readline.question('Nivel Sisben (A, B1, B2, ninguno): ');
                nivelSisben = nivelSisben !== 'ninguno' ? nivelSisben : null;
                let persona = new Persona(nombrePersona, edadPersona, generoPersona, regimenPersona, ingresoPersona, nivelSisben);
                prueba.agregarPersona(persona);

                

                agregarOtraPersona = readline.question('¿Agregar otra persona a esta prueba? (s/n): ').toLowerCase() === 's';
            }

            agregarOtraPrueba = readline.question('¿Agregar otra prueba al laboratorio? (s/n): ').toLowerCase() === 's';
        }

        seguir = readline.question('¿Registrar otro laboratorio? (s/n): ').toLowerCase() === 's';
    }

    let resultados = farmaceutica.calcularIngresosTotales();
    console.log('Ingresos totales: $', resultados.total);
    console.log('Ingresos por régimen:', resultados.ingresosPorRegimen);
    console.log('Ingresos por tipo de examen:', resultados.ingresosPorTipo);
    console.log('Descuentos por SISBEN:', resultados.descuentosPorSisben);
    console.log('Promedio de ingreso por laboratorio: $', resultados.promedioIngresoPorLaboratorio);
}

main();