/* VARIABLES Y TIPOS DE DATOS */

let numero1 = 24.3;

let numero2 = "Hola!!";

let numero3 = false;

let numero4;

let numero5 = null;

// console.log("numero1 es: " + numero1);
// console.log("numero2 es: " + numero2);
// console.log("numero3 es: " + numero3);
// console.log("numero4 es: " + numero4);
// console.log("numero5 es: " + numero5);

// CONCATENACION E INTERPOLACION

let nombre = "Mauricio Daniel";

let apellido = "Pisco";

// console.log("Hola!! Mi nombre completo es: " + nombre + " " + apellido);
// console.log(`Hola!! Mi nombre al revés es: ${apellido}, ${nombre}`);

// OPERADORES ARITMETICOS

let resultadoAritmetico;
let operando = 15;

// resultadoAritmetico = operando - 3;

// resultadoAritmetico = 10 + operando;
// resultadoAritmetico = "10" + operando;

// resultadoAritmetico = operando * 3;

// resultadoAritmetico = operando / 3;
// resultadoAritmetico = operando % 4;

// console.log(`El resultado fue: ${resultadoAritmetico}`);

// OPERADORES RELACIONALES

let resultadoLogico;

let num1 = 10;
let num2 = 20;

// resultadoLogico = num1 > num2;
// resultadoLogico = num1 < num2;

// resultadoLogico = num1 >= "10";
// resultadoLogico = num2 <= 20;

// resultadoLogico = num1 == "10";
// resultadoLogico = num1 === "10";

// resultadoLogico = num2 != "20";
// resultadoLogico = num2 !== "20";

// console.log(`El resultado fue: ${resultadoLogico}`);

// OPERADORES LOGICOS

let debeRecursar;
let puedeViajar;

let notaPrimerParcial = 8;
let notaSegundoParcial = 7;
let tieneDinero = true;

debeRecursar = (notaPrimerParcial <= 6) || (notaSegundoParcial <= 6);
puedeViajar = !debeRecursar && tieneDinero;

// console.log(`Mauricio aprobó la materia y puede viajar: ${puedeViajar}`);

// FUNCIONES

function saludar() {
    console.log("HOLA!!");
}

// saludar();
// saludar();

// FUNCIONES - PARAMETROS

function obtenerResto(dividendo, divisor) {
    let resto = dividendo % divisor;
    console.log(`Para la division entre los numeros ${dividendo} y ${divisor}, se obtuvo un resto de ${resto}`);
}

// obtenerResto(10, 2);
// obtenerResto(15, 4);

// FUNCIONES - SCOPE Y RETORNO

function suma(numero1, numero2, numero3) {
    // Variable local
    let rdoSuma = numero1 + numero2 + numero3;
    return rdoSuma;
}

function promedio(numero1, numero2, numero3) {
    return suma(numero1, numero2, numero3) / arguments.length;
    console.log("Este codigo no va a ejecutarse");
}

// console.log (`El promedio entre 5, 3 y 7 es ${promedio(5, 3, 7)}`);

// CONDICIONALES (IF / ELSE)

let edad = 8;
let categoria;

if (edad >= 18) {
    categoria = "mayor";
} else {
    categoria = "menor";
}

// console.log(`La persona es ${categoria} de edad`);

// CONDICIONALES (MULTIPLES / ANIDADOS)

// Informar calificacion (A, B, C, D) en base a puntaje obtenido (Entre 1 y 100)

let puntaje = 85;
let calificacion;

if (puntaje >= 1 && puntaje <= 100) {
    if (puntaje >= 90) { calificacion = "A" } else
        if (puntaje >= 80) { calificacion = "B" } else
            if (puntaje >= 70) { calificacion = "C" } else { calificacion = "D" }
    // console.log(`La calificacion correspondiente al puntaje ${puntaje} es: ${calificacion}`);
} else {
    console.log("Puntaje debe ser un numero entre 1 y 100");
}

// CONDICIONALES (TERNARIO)

let edadActual = 18;
let categorizacion;
let puedeConducirMoto;

(edadActual < 18) ?
    (
        // Instrucciones multiples y Asignacion condicional
        categorizacion = edadActual >= 13 ? "adolescente" : "niño",
        puedeConducirMoto = edadActual >= 16 ? true : false
    )
    :
    (
        categorizacion = "adulto",
        puedeConducirMoto = true
    );

// console.log(`La ley dicta que debes tener minimo 16 años para poder conducir una moto.
// Como eres un ${categorizacion} y tienes ${edadActual} años, ${puedeConducirMoto ? "ya " : "aún no "}puedes hacerlo.`);

// CONDICIONALES (SWITCH)

let diaSemana = 5;
let nombreDia;

switch (diaSemana) {
    case 1:
        nombreDia = "LUNES";
        break;
    case 2:
        nombreDia = "MARTES";
        break;
    case 3:
        nombreDia = "MIERCOLES";
        break;
    case 4:
        nombreDia = "JUEVES";
        break;
    case 5:
        nombreDia = "VIERNES";
        break;
    case 6:
        nombreDia = "SABADO";
        break;
    case 7:
        nombreDia = "DOMINGO";
        break;
    default:
        console.log("Se ingreso un numero de dia inválido.");
}

// if (nombreDia) { console.log("Hoy es " + nombreDia) };

// VAR vs LET

if (true) {
    var mensaje1 = "Este mensaje es GLOBAL";
    let mensaje2 = "Este mensaje es LOCAL"; // Alcance mas seguro
}

// console.log(mensaje1);
// console.log(mensaje2);

// DESAFIO PRACTICO 1 - Validador de Contraseña

let contraseña = "asfdjio498j";

function validarContraseña(cadenaIngresada) {
    console.log(`La contraseña ingresada es ${cadenaIngresada === contraseña ? "correcta" : "incorrecta"}`);
}

// validarContraseña("asfdi233");

// DESAFIO PRACTICO 2 - Calculadora de IMC

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

let IMC = calcularIMC(60, 1.65);
let categoriaIMC;

if (IMC >= 40) { categoriaIMC = "OBESIDAD GRADO 3" } else
    if (IMC >= 35) { categoriaIMC = "OBESIDAD GRADO 2" } else
        if (IMC >= 30) { categoriaIMC = "OBESIDAD GRADO 1" } else
            if (IMC >= 25) { categoriaIMC = "SOBREPESO" } else
                if (IMC >= 18, 5) { categoriaIMC = "NORMAL" } else { categoriaIMC = "OBESIDAD GRADO 3" }

// console.log (`Tu IMC es de ${IMC}, lo que te coloca dentro de la categoria: ${categoriaIMC}`);

// DESAFIO PRACTICO 3 - Conversor de Monedas

let PESO_ARGENTINO = "ARS";
let DOLAR = "USD";
let REAL = "BRL";

function convertirMoneda(cantidad, monedaOrigen, monedaDestino) {

    // Tasas al 08 de Julio de 2024

    let tasaPesoDolar = 0.0011;
    let tasaPesoReal = 0.0060;
    let tasaDolarReal = 5.48;
    let tasaDolarPeso = 917.48;
    let tasaRealPeso = 167.54;
    let tasaRealDolar = 0.18;

    switch (monedaOrigen) {
        case PESO_ARGENTINO:
            if (monedaDestino === DOLAR) {
                return cantidad * tasaPesoDolar;
            }
            else if (monedaDestino === REAL) {
                return cantidad * tasaPesoReal;
            }
            else {
                console.log("Disculpe, no encontramos la divisa de destino en nuestro sistema.");
            }
            break;
        case DOLAR:
            if (monedaDestino === PESO_ARGENTINO) {
                return cantidad * tasaDolarPeso;
            }
            else if (monedaDestino === REAL) {
                return cantidad * tasaDolarReal;
            }
            else {
                console.log("Disculpe, no encontramos la divisa de destino en nuestro sistema.");
            }
            break;
        case REAL:
            if (monedaDestino === PESO_ARGENTINO) {
                return cantidad * tasaRealPeso;
            }
            else if (monedaDestino === DOLAR) {
                return cantidad * tasaRealDolar;
            }
            else {
                console.log("Disculpe, no encontramos la divisa de destino en nuestro sistema.");
            }
            break;
        default:
            console.log("Disculpe, no encontramos la divisa de origen en nuestro sistema.");
    }
    if (monedaOrigen === monedaDestino) { return cantidad };
}

let cantidad = 100;
let monedaOrigen = REAL;
let monedaDestino = PESO_ARGENTINO;

// console.log(`${cantidad}${monedaOrigen} son equivalentes a ${convertirMoneda(cantidad, monedaOrigen, monedaDestino)}${monedaDestino}.`);

// DESAFIO PRACTICO 4 - EVALUADOR DE RANGO DE EDAD

function grupoEtario(edad) {
    if (edad >= 60) { return "ADULTO MAYOR"; }
    else if (edad >= 27) { return "ADULTO"; }
    else if (edad >= 19) { return "JOVEN ADULTO"; }
    else if (edad >= 12) { return "ADOLESCENTE"; }
    else if (edad >= 2) { return "NIÑO"; }
    else { return "LACTANTE"; }
}

let edad2 = 29;

// console.log(`¿Cómo que tienes ${edad2} años? Ya eres todo un ${grupoEtario(edad2)}. Eso hay que celebrarlo!!`);

// DESAFIO PRACTICO 5 - GENERADOR DE SALUDOS PERSONALIZADOS

function saludoPersonalizado(nombreUsuario, horaActual) {
    let mensaje = horaActual > 16 ? "Espero que hayas tenido una bonita jornada": "Que tengas una linda jornada";
    return "Hola " + nombreUsuario + `!! ${mensaje} :)`;
}

let horaActual = 11;
let nombreUsuario = "Mauricio";

// console.log(saludoPersonalizado(nombreUsuario, horaActual));

console.log(2+"3");