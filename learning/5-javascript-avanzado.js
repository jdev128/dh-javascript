// MATRICES ( Creacion / Visualizacion / Acceso - Modificacion / Recorrido )

let matriz = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[10, 11],
];

// console.log("El elemento en fila 2 y columna 0 es:", matriz[2][0]);
matriz[1][2] = 60; // Modifico elemento en fila 1 y columna 2;

// console.table(matriz);

// console.log("Elementos de la fila 1: ");
for (let i = 0; i < matriz[1].length; i++) {
	// console.log(matriz[1][i] ?? "");
}

// console.log("Elementos de la columna 2: ");
for (let i = 0; i < matriz.length; i++) {
	// console.log(matriz[i][2] ?? "");
}

let sumatoria = 0;
// console.log("Estos son los numeros pares que hallé en la matriz:");
for (let i = 0; i < matriz.length; i++) {
	for (let j = 0; j < matriz[i].length; j++) {
		sumatoria += matriz[i][j];
		if (matriz[i][j] % 2 === 0) {
			// console.log(matriz[i][j]);
		}
	}
}

// console.log("Sumatoria de elementos de la matriz completa:", sumatoria);

// FUNCIONES ( Tipos: declarada, expresada, arrow )

// Puede llamarse antes de su declaracion (Hoisting).
// Ideal para mantener legibilidad en funciones complejas.
// console.log("Suma de 1 y 2:", suma(1, 2));

function suma(a, b) {
	return a + b;
}

// Alcance local. Si se desea trabajar como variable (parametro en otras funciones, etc)
let multiplicacion = function (a, b) {
	return a * b;
};

let rectangulo = {
	altura: 3,
	ancho: 6,
	calcularArea: function () {
		return this.altura * this.ancho;
	},
};

// console.log("Producto entre 2 y 3:", multiplicacion(2, 3));
// console.log("Area de un rectangulo de 3x6:", rectangulo.calcularArea());

// Sintaxis concisa. Sin contexto this. Para funciones anonimas y simples.
let division = (a, b) => {
	return a / b;
};

// console.log("Cociente entre 5 y 2:", division(5, 2));

// FUNCIONES ( callbacks )

let arregloPrueba = [3, 5, 7, 8];

function procesarArreglo(arreglo, operacion) {
	let copy = arreglo.slice();
	for (let i = 0; i < copy.length; i++) {
		copy[i] = operacion(copy[i]);
	}
	return copy;
}

let triplicar = (numero) => {
	return numero * 3;
};

function paridad(numero) {
	return numero % 2 === 0 ? "PAR" : "IMPAR";
}

// console.log("Arreglo de prueba:", arregloPrueba);
// console.log("Arreglo triplicado:", procesarArreglo(arregloPrueba, triplicar));
// console.log("Arreglo de paridad:", procesarArreglo(arregloPrueba, paridad));

// ARREGLOS - METODOS AVANZADOS ( slice / splice / sort / find )

let estudiantes = [
	{
		nombre: "Adriana",
		apellido: "Perea",
		puntaje: 84,
	},
	{
		nombre: "Mauricio",
		apellido: "Pisco",
		puntaje: 71,
	},
	{
		nombre: "Sheila",
		apellido: "Sandoval",
		puntaje: 92,
	},
	{
		nombre: "Pedro",
		apellido: "Gonzalez",
		puntaje: 50,
	},
];

estudiantes.splice(
	3,
	1,
	{
		nombre: "Julian",
		apellido: "Alvarez",
		puntaje: 68,
	},
	{
		nombre: "Macarena",
		apellido: "Rodriguez",
		puntaje: 40,
	}
);

// Ordeno por puntaje
estudiantes.sort((estudiante1, estudiante2) => {
	switch (true) {
		case estudiante1.puntaje > estudiante2.puntaje:
			return -1;
		case estudiante1.puntaje < estudiante2.puntaje:
			return 1;
		default:
			return 0;
	}
});

// console.log("Calificaciones ordenadas de mayor a menor:", estudiantes);
// console.log ("Mi calificación fue de:", estudiantes.find(estudiante => estudiante.apellido.toUpperCase() === "PISCO").puntaje);
// console.log("Las dos calificaciones más bajas fueron:\n", estudiantes.slice(-2));

// ARREGLOS - METODOS CON CALLBACKS ( map / filter / reduce / forEach )

let numeros = [23, 34, 22, 35, 44, 17, 28];

let sumatoriaMayoresDe30 = numeros
	.filter((numero) => numero > 30)
	.reduce((sumatoria, numero) => {
		return sumatoria + numero;
	}, 0);

let paridades = numeros.map(paridad);

// console.log("Arreglo original:", numeros);
// console.log("Sumatoria de los números mayores a 30:", sumatoriaMayoresDe30);

// console.log("Paridad de cada elemento:");
paridades.forEach(function (paridad, indice) {
	// console.log(numeros[indice] + ":", paridad);
});

// DESAFIO PRACTICO - CONTROL DE GASTOS (MATRICES, CALLBACKS)

let controlGastos = [
	[200, 0, 2440, 230, 190, 240, 190],
	[230, 123, 900, 900, 490, 500, 1190],
	[430, 0, 0, 245, 990, 450, 2190],
	[234, 75, 140, 1900, 90, 205, 1980],
];

function totalPorSemana(registroGastos, numeroSemana) {
	return registroGastos[numeroSemana - 1].reduce((sumatoria, diaActual) => {
		return sumatoria + diaActual;
	});
}

function totalPorDia(registroGastos, numeroDia) {
	return registroGastos.reduce((sumatoria, semanaActual) => {
		return sumatoria + semanaActual[numeroDia - 1];
	}, 0);
}

function totalMensual(registroGastos) {
	let total = 0;
	for (let i = 0; i < registroGastos.length; i++) {
		total += totalPorSemana(registroGastos, i + 1);
	}
	return total;
}

function totalesSemanales(registroGastos) {
	return registroGastos.map((semana) =>
		semana.reduce((sumatoria, diaActual) => {
			return sumatoria + diaActual;
		}, 0)
	);
}

// console.table(controlGastos);
// console.log("Total semana 2 (fila 1):", totalPorSemana(controlGastos, 2));
// console.log("Total dia Lunes (columna 0):", totalPorDia(controlGastos, 1));
// console.log("Totales semanales:", totalesSemanales(controlGastos));
// console.log("Total mensual:", totalMensual(controlGastos));
