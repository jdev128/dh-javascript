// ORDENAMIENTO ( BUBBLE SORT )

let numeros = [5, 4, 1, 6, 3, 2];
let animales = [
	"Perro",
	"Gato",
	"Castor",
	"Jirafa",
	"Conejo",
	"Rata",
	"Jirafa",
];
let personas = [
	{
		nombre: "Mauricio",
		edad: 29,
	},
	{
		nombre: "Leticia",
		edad: 42,
	},
	{
		nombre: "Pedro",
		edad: 20,
	},
];

let cantidadComparaciones = 0;

// Ejecuta n**2 comparaciones

/* for (let j = 0; j < array.length; j++) {
    let aux;
    for (i = 0; i < array.length; i++) {
        cantidadComparaciones += 1;
        if (array[i] > array[i+1]) {
            aux = array[i];
            array[i] = array[i+1];
            array[i+1] = aux;
        }
    }
} */

function bubbleSort(arreglo, propiedad = null) {
	let array = arreglo.slice();
	let indiceFinal = array.length - 1;
	let esMayor;
	if (propiedad != null && !(propiedad in arreglo[0])) {
		console.log("Campo inválido");
		return;
	}
	while (indiceFinal > 0) {
		let aux;
		for (let i = 0; i < indiceFinal; i++) {
			cantidadComparaciones += 1;
			esMayor =
				propiedad === null
					? array[i] > array[i + 1]
					: array[i][propiedad] > array[i + 1][propiedad];
			// Alternar operador para ordenar de mayor a menor
			if (esMayor) {
				aux = array[i];
				array[i] = array[i + 1];
				array[i + 1] = aux;
			}
		}
		// Optimización para no validar contra últimos valores
		indiceFinal -= 1;
	}
	return array;
}

// console.log(bubbleSort(numeros), cantidadComparaciones);
// console.log(bubbleSort(animales), cantidadComparaciones);

// console.log(bubbleSort(personas, "edad"), cantidadComparaciones);
// console.log(bubbleSort(personas, "email"), cantidadComparaciones);

// BUSQUEDA ( LINEAR SEARCH ) - Arreglos desordenados

let arregloNumerico = [239, 438, 234, 6574, 838, 223];

/** Busca un elemento dentro del arreglo.
 *
 * Si lo encuentra, devuelve el indice donde fue hallado,
 * de lo contrario devuelve -1.
 */
function linearSearch(array, element, property = null) {
	let valorAComparar;
	for (let i = 0; i < array.length; i++) {
		valorAComparar = property == null ? array[i] : array[i][property]
		if (valorAComparar === element) {
			return i;
		}
	}
	return -1;
}

let elemento = 838;
let indiceElemento = linearSearch(arregloNumerico, elemento);

/* console.log("Números disponibles:",arregloNumerico);
console.log(
	indiceElemento === -1
		? `El elemento ${elemento} no se encuentra dentro del arreglo`
		: `El elemento ${elemento} se encuentra en la posición: ` + indiceElemento
); */

// BUSQUEDA ( BINARY SEARCH ) - Arreglos ordenados

let cantidadVueltas = 0;

/* function binarySearch(arreglo, elemento) {
	let indiceInicial = 0;
	let indiceFinal = arreglo.length - 1;
	let indiceMedio;
	while (indiceInicial <= indiceFinal) {
		cantidadVueltas++;
		indiceMedio = Math.floor((indiceInicial + indiceFinal) / 2);
		if (arreglo[indiceMedio] === elemento) {
			return indiceMedio;
		} else if (arreglo[indiceMedio] < elemento) {
			indiceInicial = indiceMedio + 1;
		} else {
			indiceFinal = indiceMedio - 1;
		}
	}
	return -1;
} */

function binarySearch(arreglo, valorBuscado, propiedad =  null) {
	let cantidadElementos = arreglo.length;
	let posicionInicial = 0;
	let posicionActual;
	let elementoAComparar;

	while (cantidadElementos > 0) {
		cantidadVueltas++;
		cantidadElementos = Math.floor(cantidadElementos / 2);
		posicionActual = posicionInicial + cantidadElementos;
		elementoAComparar = propiedad == null ? arreglo[posicionActual] : arreglo[posicionActual][propiedad];
		if (elementoAComparar === valorBuscado) {
			return posicionActual;
		} else if (elementoAComparar < valorBuscado) {
			posicionInicial = posicionActual + 1;
		}
	}
	return -1;
}

/* arregloNumerico = [239];
elemento = 120; */

/* arregloNumerico = [239, 438];
elemento = 240; */

/* arregloNumerico = [115, 239, 438, 505, 782];
elemento = 800; */

arregloNumerico = [115, 239, 438, 505, 782, 872, 999, 1000, 1200, 1780, 8000];
elemento = 1790;

indiceElemento = binarySearch(arregloNumerico, elemento);

/* console.log("Números disponibles:", arregloNumerico);
console.log("Cantidad de iteraciones:", cantidadVueltas);
console.log(
	indiceElemento === -1
		? `El elemento ${elemento} no se encuentra dentro del arreglo`
		: `El elemento ${elemento} se encuentra en la posición: ` +
				indiceElemento
); */

// DESAFIO PRACTICO 1 - BUBBLE SORT

arregloNumerico = [154, 238, 20, 45, 340, 1, 543, 2, 12];
let arregloOrdenado = bubbleSort(arregloNumerico);
// console.log(arregloOrdenado);

// DESAFIO PRACTICO 2 - ESTADO DE ORDENAMIENTO ASCENDENTE

function validarOrdenamientoAscendente(arreglo) {
	for (let i = 0; i < arreglo.length - 1; i++) {
		if (arreglo[i] > arreglo[i + 1]) {
			return false;
		}
	}
	return true;
}

// console.log(validarOrdenamientoAscendente(arregloNumerico));
// console.log(validarOrdenamientoAscendente(arregloOrdenado));

// DESAFIO PRACTICO 3 - CANTIDAD DE APARICIONES DE UN ELEMENTO

function contarApariciones(arreglo, elemento) {
	let cantidadApariciones = 0;
	for (let i = 0; i < arreglo.length; i++) {
		if (arreglo[i] === elemento) {
			cantidadApariciones++;
		}
	}
	return cantidadApariciones;
}

arregloNumerico = [154, 238, 20, 45, 138, 340, 1, 543, 2, 12, 138];
// console.log(contarApariciones(arregloNumerico, 12));

// DESAFIO PRACTICO 4 - BUSQUEDA LINEAL EN OBJETOS

let encuestaCanciones = [
	{
		nombre: "FIX YOU",
		cantidadVotos: 190000,
	},
	{
		nombre: "USED TO BE YOUNG",
		cantidadVotos: 90000,
	},
	{
		nombre: "HOUDINI",
		cantidadVotos: 120000,
	},
	{
		nombre: "EL MISMO AIRE",
		cantidadVotos: 70000,
	},
	{
		nombre: "BRUJULA",
		cantidadVotos: 20000,
	},
];

/* function buscarCantidadVotos(canciones, nombreCancion) {
	let indiceObtenido = linearSearch(
		canciones,
		nombreCancion.toUpperCase(),
		"nombre",
	);
	return indiceObtenido === -1 ? null : canciones[indiceObtenido].cantidadVotos;
} */

// DESAFIO PRACTICO 5 - BUSQUEDA BINARIA EN OBJETOS

function buscarCantidadVotos(canciones, nombreCancion) {
	let cancionesOrdenadasPorNombre = bubbleSort(canciones, "nombre");
	let indiceObtenido = binarySearch(
		cancionesOrdenadasPorNombre,
		nombreCancion.toUpperCase(),
		"nombre",
	);
	return indiceObtenido === -1 ? null : cancionesOrdenadasPorNombre[indiceObtenido].cantidadVotos;
}

let cancion = "Used to be young";
console.log(`Cantidad de votos "${cancion}":`, buscarCantidadVotos(encuestaCanciones, cancion));
