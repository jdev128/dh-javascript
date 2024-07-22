// npm i prompt-sync
const prompt = require("prompt-sync")({ sigint: true });

// CICLOS (WHILE)

// Contador

let contador = 0; // Variable de control (1)

// console.log("Vamos a contar del 0 al 5:")


while (contador <= 5) { // Condicion de corte (2)
    // console.log(contador);
    contador++; // Actualizar variable de control (3)
}

// Promedio de Notas

// console.log("Bienvenido/a a la calculadora de promedios 1.0: ")

let control = "Y";

let sumaNotas = 0; //Variable acumuladora
let cantidadNotas = 0; // Variable contadora

let notaActual;

/* while (control === "Y") {
    notaActual = parseInt(prompt("Por favor, ingrese una nota: "));

    sumaNotas += notaActual;
    cantidadNotas++;

    control = prompt("¿Desea continuar ingresando notas? (Y/N):");
} */

// console.log("El promedio del estudiante es: ", sumaNotas / cantidadNotas);

// CICLOS (DO WHILE)

// Juego para adivinar numeros

let numeroAleatorio = parseInt(Math.random() * 10);
let numero;
let intentos = 0;
// console.log("Estoy aburrido... ¿Y si jugamos a adivinar el numero en el que estoy pensando?");

/* do {
    intentos++;
    numero = parseInt(prompt("Por favor, ingresa un numero del 0 al 10: "));
    if (numero > numeroAleatorio) {
        console.log("Muy alto, intenta nuevamente...");
    } else if (numero < numeroAleatorio) {
        console.log("Muy bajo, intenta nuevamente...");
    }
} while (numero !== numeroAleatorio); */

let mensaje = (intentos === 1) ?
    "Guau!! Adivinaste el número en el primer intento!! Estoy sin palabras..." :
    `Felicidades!! Adivinaste en el intento número ${intentos}. Puedes volver a llamarme si deseas
superar tu record :)`;
// console.log(mensaje);

//  CICLOS (FOR LOOP)

for (let i = 1; i <= 5; i++) {
    // console.log(i);
}

let j;

for (j = 6; j >= 0; j -= 2) {
    // console.log(j);
}

// ARREGLOS - CREACION / ACCESO / RECORRIDO

let numeros = [3, 4, 5, 8, 91, 993];

for (let i = 0; i < numeros.length; i++) {
    // console.log(numeros[i]);
}

// ARREGLOS - ALGORITMOS CLASICOS

let arregloNumerico = [30, 14, 23, 77, 52];

// Agregar elemento

arregloNumerico[arregloNumerico.length] = 68;
// console.log("Arreglo Original: ", arregloNumerico);

// Modificar cada elemento (Distancia al 100)
for (let i = 0; i < arregloNumerico.length; i++) {
    arregloNumerico[i] = 100 - arregloNumerico[i];
}

// Extraer elemento a una variable (EL MENOR)
// Extraer todos los elementos (CALCULAR PROMEDIO)

let valorMasChico = arregloNumerico[0];
let sumatoriaElementos = 0;

for (let i = 0; i < arregloNumerico.length; i++) {
    sumatoriaElementos += arregloNumerico[i];
    if (arregloNumerico[i] < valorMasChico) {
        valorMasChico = arregloNumerico[i];
    }
}

// console.log("Arreglo nuevo, reemplazando cada elemento por su distancia al numero 100: ", arregloNumerico);
// console.log("Elemento mas chico del nuevo arreglo: ", valorMasChico);
// console.log("Promedio del nuevo arreglo: ", sumatoriaElementos / arregloNumerico.length);

// ARREGLOS - METODOS ( push / pop / shift / unshift / join / indexOf / lastIndexOf / includes )

let frutas = ["banana", "anana", "naranja", "frutilla", "cereza", "pera"];

let cantidadFrutas = frutas.push("tomate", "pera");
cantidadFrutas = frutas.unshift("manzana");

// console.log(`Tengo estas ${cantidadFrutas} frutas en mi canasto: `, frutas.join(", "));

let papaEsFruta = frutas.includes("papa");
if (!papaEsFruta) {
    // console.log("La papa no es una fruta, por eso no la menciono :)");
}

let tengoVariasPeras = frutas.indexOf("pera") !== frutas.lastIndexOf("pera"); // -1 si no lo encuentra
if (tengoVariasPeras) {
    // console.log("Ups, creo que tengo mas peras de las que deseo... Voy a dejar la ultima que tome...");
    frutas.pop();
}

// console.log("Creo que siguen siendo muchas, dejare la primer manzana que tome...")
let manzanaDevuelta = frutas.shift();

// console.log("Ahora si tengo las frutas que necesito :) ", frutas.join(" - "));

// STRINGS - METODOS ( acceso a caracteres / length / indexOf / slice / trim / split / replace )

let fraseFamosaAutor = "   Si tu no trabajas por tus sueños, alguien te contratará para que trabajes por los suyos. Buda   ";
fraseFamosaAutor = fraseFamosaAutor.trim();
fraseFamosaAutor = fraseFamosaAutor.replace("Buda", "Steve Jobs");

// Caracter en ultimo indice no se incluye, y por ir hasta el final del arreglo, podria omitirse.
let autor = fraseFamosaAutor.slice(fraseFamosaAutor.indexOf(".") + 1, fraseFamosaAutor.length).trim();
let soloFrase = fraseFamosaAutor.split(".")[0].trim();

let primerCaracter = soloFrase[0];
let ultimosCaracteres = soloFrase.slice(-5);
let cantidadPalabras = soloFrase.split(" ").length;
let cantidadCaracteres = soloFrase.length;

/* console.log("La frase '" + soloFrase +
    "' inicia con la letra '" + primerCaracter +
    "', finaliza con los caracteres '" + ultimosCaracteres +
    "', tiene " + cantidadCaracteres + " caracteres, " +
    cantidadPalabras + ` palabras y se hizo famosa gracias a ${autor}.`); */

// OBJETOS LITERALES ( creacion / agregado, eliminado y uso de propiedades y metodos / this )

let personaPrueba = {
    nombre: "Mauricio Daniel",
    apellido: "Pisco",
    edad: 23,
    email: "maurip@gmail.com",
    presentar: function () {
        return `Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años`;
    }
}

personaPrueba.coloresFavoritos = ["Azul", "Verde"];
delete personaPrueba.email;

// console.log(personaPrueba);
// console.log(personaPrueba.presentar());

// DESAFIO PRACTICO 1 - UNIR DOS ARREGLOS

function unirArreglos(arreglo1, arreglo2) {
    return arreglo1.concat(arreglo2);
}

// console.log(unirArreglos(["PRUEBA", "UNION"], ["DE", "DOS", "ARREGLOS"]));

// DESAFIO PRACTICO 2 - ELIMINAR PRIMER ELEMENTO

function eliminarPrimerElemento(arreglo = []) {
    return arreglo.shift();
}

let arregloCompleto = ["PRUEBO","ELIMINAR","ELEMENTO"];
// console.log(eliminarPrimerElemento(arregloCompleto), arregloCompleto);

// DESAFIO PRACTICO 3 - CONVERTIR TEXTO

function imprimirEnMayusculasYMinusculas(cadena) {
    console.log("Cadena en mayúsculas:", cadena.toUpperCase());
    console.log("Cadena en minúsculas", cadena.toLowerCase());
}

// imprimirEnMayusculasYMinusculas("Pruebo conversion a MAYUSCULAS y minusculas");

// DESAFIO PRACTICO 4 - MANIPULAR OBJETOS

let persona = {
    nombre: "Mauricio",
    edad: 23,
    ocupacion: "Desarrollador Java"
}

function imprimirObjeto(objeto) {
    console.log(objeto);
}

imprimirObjeto(persona);

persona.ocupacion = "Desarrollador Frontend";
persona.habilidad = "Liderazgo";

imprimirObjeto(persona);

// DESAFIO PRACTICO 5 - OBJETOS ANIDADOS

persona.ubicacion = {
    codigoPostal: "1900",
    ciudad: "La Plata",
    calle: "Calle 50",
    numero: 615
}

imprimirObjeto(persona);

function eliminarPropiedad (objeto, propiedad) {
    switch (propiedad) {
        case "nombre":
            delete objeto.nombre;
            break;
        case "edad":
            delete objeto.edad;
            break;
        case "ocupacion":
            delete objeto.ocupacion;
            break;
        case "habilidad":
            delete objeto.habilidad;
            break;
        case "ubicacion":
            delete objeto.ubicacion;
            break;
        default:
            console.log("El objeto no cuenta con la propiedad ingresada.")
    }
}

eliminarPropiedad(persona, "habilidad");
imprimirObjeto(persona);
