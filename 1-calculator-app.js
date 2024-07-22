// npm i prompt-sync
const prompt = require("prompt-sync")({ sigint: true });

// FUNCIONALIDAD INTERNA

/** Calcula la suma entre dos números.
 * @param {number} sumando1 El primer número a sumar
 * @param {number} sumando2 El segundo número a sumar
 * @returns {number} La suma entre ambos números
 */
function sumar(sumando1, sumando2) {
	return sumando1 + sumando2;
}

/** Calcula la diferencia entre dos números.
 * @param {number} minuendo El número a disminuir
 * @param {number} sustraendo El número de unidades a sustraer
 * @returns {number} La diferencia entre ambos números
 */
function restar(minuendo, sustraendo) {
	return minuendo - sustraendo;
}

/** Calcula el producto entre dos números.
 * @param {number} factor1 El número a multiplicar
 * @param {number} factor2 El número por el cual multiplicar
 * @returns {number} El producto entre ambos números
 */
function multiplicar(factor1, factor2) {
	return factor1 * factor2;
}

/** Calcula el cociente entre dos números.
 * @param {number} dividendo El número a dividir
 * @param {number} divisor El número por el cual dividir
 * @returns {number} El cociente o Infinity / -Infinity si divisor es 0.
 */
function dividir(dividendo, divisor) {
	return dividendo / divisor;
}

/**
 * Solicita una operación al usuario y valida lo ingresado.
 * @returns {string} Una letra que representa una operación válida.
 */
function solicitarOperacion() {
	const OPERACIONES_DISPONIBLES = ["S", "R", "D", "M", "Q"];

	console.log(
		`\nEstas son todas las operaciones que puedes realizar:

        S. Suma
        R. Resta
        D. División
        M. Multiplicación

        Q. Cerrar aplicación.
    `
	);

	let operacion = prompt("Por favor, ingresa la que desees: ")
		.trim()
		.toUpperCase();

	// Switch de Opciones

	while (!OPERACIONES_DISPONIBLES.includes(operacion)) {
		operacion = prompt(
			"No encontré esa operación dentro de mis registros :/ Por favor ingresa una letra del listado anterior: "
		)
			.trim()
			.toUpperCase();
	}

	return operacion;
}

/**
 * Solicita un número al usuario y valida lo ingresado.
 * @param {string} mensajeInicial El mensaje a presentar al usuario para solicitar el numero
 * @returns Un número previamente validado
 */
function solicitarNumero(mensajeInicial) {
	let numero = parseInt(prompt(mensajeInicial).trim());

	while (isNaN(numero)) {
		numero = parseInt(
			prompt("Por favor, ingresa un número válido: ").trim()
		);
	}

	return numero;
}

/**
 * Aplica una operación sobre dos números, en el orden en fueron provistos
 * @param {string} operacion Una letra representando la operación a realizar
 * @param {number} numero1 El primer operando
 * @param {number} numero2 El segundo operando
 * @returns El resultado de la operación
 */
function obtenerResultado(operacion, numero1, numero2) {
	switch (operacion) {
		case "S":
			return sumar(numero1, numero2);
		case "R":
			return restar(numero1, numero2);
		case "D":
			return dividir(numero1, numero2);
		case "M":
			return multiplicar(numero1, numero2);
	}
}

// INTERACCION CON EL USUARIO

console.log("Bienvenido/a a tu nueva calculadora para el día a día ;)");
let operacion;

do {
	operacion = solicitarOperacion();

	if (operacion !== "Q") {
		console.log(
			"\nAhora necesito que ingreses los dos números con los que deseas operar:"
		);

		let numero1 = solicitarNumero("Ingresa el primero: ");

		let numero2 = solicitarNumero("Ingresa el segundo: ");

		while (operacion === "D" && numero2 === 0) {
			numero2 = solicitarNumero(
				"No es posible dividir por 0, por favor ingresa otro valor: "
			);
		}

		let resultado = obtenerResultado(operacion, numero1, numero2);

		console.log("El resultado de la operación es: ", resultado);
	}
} while (operacion !== "Q");

console.log("Fue un placer poder ayudarte :D Hasta la próxima!!");
