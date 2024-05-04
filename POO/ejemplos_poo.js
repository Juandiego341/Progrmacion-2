class Persona {
    constructor(nombre, edad, genero, esContributivo, sistemaA) {
      this.nombre = nombre;
      this.edad = edad;
      this.genero = genero;
      this.esContributivo = esContributivo;
      this.sistemaA = sistemaA;
    }
  }
  
  class Laboratorio {
    constructor(nombre) {
      this.nombre = nombre;
      this.examenes = [];
    }
  
    agregarExamen(examen) {
      this.examenes.push(examen);
    }
  
    calcularIngresos(personas) {
      let ingresoTotal = 0;
      let ingresoContributivo = 0;
      let ingresoSubsidiado = 0;
      let ingresoSisben = 0;
      let ingresoPorTipo = {};
      let laboratoriosAbajoPromedio = [];
      let laboratoriosArribaPromedio = [];
  
      personas.forEach(persona => {
        let ingresoPersona = 0;
        let esArribaPromedio = false;
        let esAbajoPromedio = false;
  
        this.examenes.forEach(examen => {
          let ingresoExamen = examen.calcularIngreso(persona);
          ingresoPersona += ingresoExamen;
  
          if (!ingresoPorTipo[examen.tipo]) {
            ingresoPorTipo[examen.tipo] = 0;
          }
  
          ingresoPorTipo[examen.tipo] += ingresoExamen;
        });
  
        if (persona.esContributivo && persona.sistemaA) {
          let encimaSalarioMinimo = persona.edad - 3;
          encimaSalarioMinimo = encimaSalarioMinimo > 0 ? encimaSalarioMinimo : 0;
          ingresoContributivo += ingresoPersona + (encimaSalarioMinimo * ingresoPersona * 0.1);
        } else {
          ingresoSubsidiado += ingresoPersona;
        }
  
        ingresoTotal += ingresoPersona;
  
        if (persona.sistemaA === 'A') {
          ingresoSisben += ingresoPersona * 0.1;
        } else if (persona.sistemaA === 'B1') {
          ingresoSisben += ingresoPersona * 0.05;
        } else if (persona.sistemaA === 'B2') {
          ingresoSisben += ingresoPersona * 0.02;
        }
  
        let promedioIngresos = ingresoTotal / this.examenes.length;
  
        if (ingresoPersona < promedioIngresos) {
          esAbajoPromedio = true;
        } else if (ingresoPersona > promedioIngresos) {
          esArribaPromedio = true;
        }
  
        if (esAbajoPromedio) {
          laboratoriosAbajoPromedio.push({ nombre: this.nombre, ingreso: ingresoPersona });
        }
  
        if (esArribaPromedio) {
          laboratoriosArribaPromedio.push({ nombre: this.nombre, ingreso: ingresoPersona });
        }
      });
  
      return {
        ingresoTotal,
        ingresoContributivo,
        ingresoSubsidiado,
        ingresoSisben,
        ingresoPorTipo,
        laboratoriosAbajoPromedio,
        laboratoriosArribaPromedio
      };
    }
  }
  
  class Examen {
    constructor(nombre, tipo, valor) {
      this.nombre = nombre;
      this.tipo = tipo;
      this.valor = valor;
    }
  
    calcularIngreso(persona) {
      return this.valor;
    }
  }
  
  // Datos
  let personas = [
    new Persona('Juan',25, 'M', true, 'A'),
    new Persona('Ana', 30, 'F', false, 'B1'),
    new Persona('Carlos', 35, 'M', true, 'B2')
  ];
  
  let laboratorio = new Laboratorio('Laboratorio 1');
  
  laboratorio.agregarExamen(new Examen('Sangre', 'sangre', 50));
  laboratorio.agregarExamen(new Examen('Ojos', 'ojos', 70));
  laboratorio.agregarExamen(new Examen('Oidos', 'oidos', 80));
  
  let resultado = laboratorio.calcularIngresos(personas);
  console.log(resultado);