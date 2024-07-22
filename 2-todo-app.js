// LISTA DE TAREAS POR HACER

// npm i prompt-sync
const prompt = require("prompt-sync")({ sigint: true });

let tareas = [];
let categorias = ["Personal", "Trabajo"];

// Funciones auxiliares

function indiceEsValido(indice, longitudArreglo) {
	// console.log(indice, typeof indice); // TODO: Remover una vez finalizado
	let indiceNumerico = parseInt(indice);
	if (
		typeof indiceNumerico === "number" &&
		!isNaN(indiceNumerico) &&
		indiceNumerico >= 0 &&
		indiceNumerico < longitudArreglo
	) {
		return true;
	}
	return false;
}

/** Devuelve un indice correctamente validado */
function solicitarIndiceValido(mensaje, longitudArreglo, obligatorio = true) {
	let indice = prompt(mensaje).trim();
	while (obligatorio && !indiceEsValido(indice, longitudArreglo)) {
		indice = prompt(
			`Indice inválido... Por favor, ingresa un número entre 0 y ${
				longitudArreglo - 1
			}: `
		).trim();
	}
	return indice.length === 0 ? null : parseInt(indice);
}

/** Devuelve una descripcion correctamente validada */
function solicitarDescripcionValida(mensaje, obligatoria = false) {
	let descripcion = prompt(mensaje).trim();
	while (obligatoria && descripcion.length === 0) {
		descripcion = prompt(
			"Dato obligatorio... Por favor, ingresa algún valor: "
		).trim();
	}
	return descripcion.length === 0 ? null : descripcion;
}

/**
 *	Devuelve una fecha correctamente validada
 * @param {string} mensaje El mensaje que se desea presentar al usuario
 * @returns Una fecha con el formato dd/mm/aaaa, o 99/99/9999 si no se ingresó ningún valor.
 */
function solicitarFechaValida(mensaje) {
	let fecha = prompt(mensaje).trim();
	let formatoValido = fecha.match("[0-9]{2}/[0-9]{2}/[0-9]{4}");
	while (fecha.length !== 0 && !formatoValido) {
		fecha = prompt(
			"Fecha inválida... Por favor, ingresa una con el formato dd/mm/aaaa: "
		).trim();
		formatoValido = fecha.match("[0-9]{2}/[0-9]{2}/[0-9]{4}");
	}
	return fecha.length === 0 ? "99/99/9999" : fecha;
}

function listarEstados() {
	console.log("Estos son los estados que puedes seleccionar:");
	console.log("   P. Pendiente");
	console.log("   F. Finalizada");
}

/**
 *	Devuelve un estado correctamente validado
 * @param {string} mensaje El mensaje que se desea presentar al usuario
 * @returns F (Finalizada), P (Pendiente), null si no se ingresó ningún valor.
 */
function solicitarEstadoValido(mensaje) {
	listarEstados();
	let estado = prompt(mensaje).trim().toUpperCase();
	let estadoValido = estado.length === 0 || ["P", "F"].includes(estado);
	while (!estadoValido) {
		estado = prompt(
			"Dato inválido... Por favor, ingresa un valor del listado anterior o déjalo vacío: "
		)
			.trim()
			.toUpperCase();
		estadoValido = estado.length === 0 || ["P", "F"].includes(estado);
	}
	return estado.length === 0 ? null : estado;
}

function listarPropiedadesTareas() {
	console.log("Estos son los campos por los que puedes ordenar:");
	console.log("   D. Descripcion");
	console.log("   F. Fecha Limite");
}

/**
 *	Devuelve el nombre de una propiedad existente dentro de cada tarea
 * @param {string} mensaje El mensaje que se desea presentar al usuario
 * @returns El nombre de una propiedad, o null si no se ingresó ningún valor.
 */
function solicitarPropiedadValida(mensaje) {
	let propiedadesDisponibles = ["D", "F"];
	listarPropiedadesTareas();
	let propiedad = prompt(mensaje).trim().toUpperCase();
	let propiedadValida =
		propiedad.length === 0 || propiedadesDisponibles.includes(propiedad);
	while (!propiedadValida) {
		propiedad = prompt(
			"Dato inválido... Por favor, ingresa un valor del listado anterior o déjalo vacío: "
		)
			.trim()
			.toUpperCase();
		propiedadValida =
			propiedad.length === 0 ||
			propiedadesDisponibles.includes(propiedad);
	}
	switch (propiedad) {
		case "D":
			return "descripcion";
		case "F":
			return "fechaLimite";
		default:
			return null;
	}
}

// Funciones principales

function agregarCategoria(descripcion) {
	categorias.push(descripcion);
	console.log("La categoría fue agregada correctamente :D");
}

function agregarTarea(descripcion, indiceCategoria, fechaLimite) {
	tareas.push({
		descripcion: descripcion,
		indiceCategoria: indiceCategoria,
		fechaLimite: fechaLimite,
		completada: false,
	});
	console.log("La tarea fue agregada correctamente :D");
	// console.log(tareas[tareas.length - 1]); // TODO: Remover una vez finalizado
}

function modificarTarea(indice, descripcion, indiceCategoria, fechaLimite) {
	tareas[indice].descripcion = descripcion ?? tareas[indice].descripcion;
	tareas[indice].indiceCategoria =
		indiceCategoria ?? tareas[indice].categoria;
	tareas[indice].fechaLimite = fechaLimite !== "99/99/9999" ? fechaLimite : tareas[indice].fechaLimite;
	console.log("Los cambios solicitados se aplicaron correctamente :D");
	// console.log(tareas[indice]); // TODO: Remover una vez finalizado
}

function eliminarTarea(indice) {
	tareas.splice(indice, 1);
	console.log("La tarea fue eliminada correctamente :D");
}

function invertirEstado(indice) {
	tareas[indice].completada = !tareas[indice].completada;
	console.log("La tarea fue actualizada correctamente :D");
}

function imprimirTareas(tareas) {
	let categoriaFormateada;
	let fechaFormateada;
	let estado;
	for (let indice = 0; indice < tareas.length; indice++) {
		categoriaFormateada = ` - Categoria: ${
			categorias[tareas[indice].indiceCategoria]
		}`;
		fechaFormateada = ` - Fecha limite: ${
			tareas[indice].fechaLimite !== "99/99/9999"
				? tareas[indice].fechaLimite
				: "sin definir"
		}`;
		estado = tareas[indice].completada
			? " [ FINALIZADA ]"
			: " [ PENDIENTE ]";
		// TODO: Imprimir identificador una vez disponible
		console.log(
			indice +
				". " +
				tareas[indice].descripcion +
				categoriaFormateada +
				fechaFormateada +
				estado
		);
	}
}

function listarCategorias() {
	console.log("Estas son las categorias disponibles:");
	categorias.forEach((categoria, indice) => {
		console.log(`   ${indice}: ${categoria}`);
	});
}

/** Genera un nuevo filtro en base a la entrada del usuario.
 * @return Un filtro, o null si el usuario decidió no filtrar por ningún campo.
 */
function armarFiltro() {
	listarCategorias();
	let indiceCategoria = solicitarIndiceValido(
		"Ingresa la CATEGORIA de las tareas que deseas ver (deja sin completar si no quieres filtrar por este valor): ",
		categorias.length,
		false
	);
	let estado = solicitarEstadoValido(
		"Ingresa el ESTADO de las tareas que deseas ver (deja sin completar si no quieres filtrar por este valor): "
	);
	let completada = estado !== null ? estado === "F" : null;
	// Valor 0 es evaluado a falsy (indiceCategoria)
	let filtro =
		indiceCategoria !== null || completada !== null
			? {
					indiceCategoria: indiceCategoria,
					completada: completada,
			  }
			: null;
	// console.log(indiceCategoria, estado, completada, "Filtro:", filtro); // TODO: Eliminar una vez probado
	return filtro;
}

function filtrarTareas(filtro) {
	let coincideCategoria;
	let coincideCompletada;
	if (filtro === null) {
		return tareas;
	}
	return tareas.filter(function (tarea) {
		coincideCategoria =
			tarea.indiceCategoria ===
			(filtro.indiceCategoria ?? tarea.indiceCategoria);
		coincideCompletada =
			tarea.completada === (filtro.completada ?? tarea.completada);
		return coincideCategoria && coincideCompletada;
	});
}

/** Ordena las tareas haciendo uso del algoritmo burbuja.
 *
 * @param {string} propiedad La propiedad por la cual ordenar el arreglo
 */
function ordenarTareas(propiedad) {
	if (tareas.length !== 0 && !(propiedad in tareas[0])) {
		console.log("Campo inválido");
		return;
	}
	/* 	TODO: METODO CON EFECTOS SECUNDARIOS: Se pierde orden original
	Ordenar una copia del arreglo y asignar un identificador unico a 
	cada tarea (no usar indice). Requiere cambios en varios métodos.*/
	// let tareasOrdenadas = tareas.slice();
	let indiceFinal = tareas.length - 1;
	while (indiceFinal > 0) {
		let aux;
		for (let i = 0; i < indiceFinal; i++) {
			// Alternar operador para ordenar de mayor a menor
			if (tareas[i][propiedad] > tareas[i + 1][propiedad]) {
				aux = tareas[i];
				tareas[i] = tareas[i + 1];
				tareas[i + 1] = aux;
			}
		}
		// Optimización para no validar contra últimos valores
		indiceFinal -= 1;
	}
}

/**
 * Busca la tarea cuyo nombre coincide con lo definido, usando busqueda
 * binaria.
 * @param {string} nombre El nombre de la tarea que se desea encontrar
 * @returns {number} El indice donde se encuentra la tarea.
 */
function buscarTarea(nombrePropiedad, valor) {
	// TODO: Convertir a funcion pura
	ordenarTareas(nombrePropiedad);
	let indiceInicial = 0;
	let indiceFinal = tareas.length - 1;
	while (indiceInicial <= indiceFinal) {
		let indiceMedio = Math.floor((indiceInicial + indiceFinal) / 2);
		if (tareas[indiceMedio][nombrePropiedad] === valor) {
			return indiceMedio;
		}
		if (tareas[indiceMedio][nombrePropiedad] > valor) {
			indiceFinal = indiceMedio - 1;
		} else {
			indiceInicial = indiceMedio + 1;
		}
	}
	return -1;
}

function listarOperaciones() {
	console.log("Estas son las operaciones que puedes realizar: \n");

	console.log("   V. Visualizar tareas");
	console.log("   F. Filtrar tareas");
	console.log("   R. Reordenar tareas"); // TODO: Integrar con visualizacion
	console.log("   D. Buscar tarea por descripción\n");

	console.log("   C. Cambiar estado de una tarea");
	console.log("   N. Crear nueva tarea");
	console.log("   M. Modificar tarea");
	console.log("   E. Eliminar tarea\n");

	console.log("   K. Crear categoria");
	console.log("   L. Listar categorias");

	console.log("   O. Ver operaciones disponibles");

	console.log("   Q. Cerrar aplicación\n");
}

function interactuarConUsuario() {
	console.log("Bienvenido/a a tu gestor de tareas.");
	let opcionSeleccionada;
	let indice;
	let descripcion;
	let indiceCategoria;
	let fechaLimite;
	let mensajeSinTareas =
		"Aún no tienes tareas cargadas :/ Por favor, carga alguna y vuelve a ejecutar la operación...";
	listarOperaciones();
	do {
		opcionSeleccionada = prompt(
			"Por favor, ingresa la letra de la OPERACION que deseas: "
		).toUpperCase();

		switch (opcionSeleccionada) {
			case "N":
				descripcion = solicitarDescripcionValida(
					"Ingresa una DESCRIPCION para la tarea: ",
					true
				);
				listarCategorias();
				indiceCategoria = solicitarIndiceValido(
					"Ingresa la CATEGORIA que deseas asignar a la tarea: ",
					categorias.length,
					true
				);
				fechaLimite = solicitarFechaValida(
					"Ingresa una FECHA LIMITE para la tarea (opcional): "
				);
				agregarTarea(descripcion, indiceCategoria, fechaLimite);
				break;

			case "M":
				if (tareas.length === 0) {
					console.log(mensajeSinTareas);
				} else {
					indice = solicitarIndiceValido(
						"Ingresa el INDICE de la tarea que deseas modificar: ",
						tareas.length,
						true
					);
					descripcion = solicitarDescripcionValida(
						"Ingresa una nueva DESCRIPCION para la tarea (déjala vacía si no deseas modificarla): ",
						false
					);
					listarCategorias();
					indiceCategoria = solicitarIndiceValido(
						"Ingresa una nueva CATEGORIA para la tarea (déjala vacía si no deseas modificarla): ",
						categorias.length,
						false
					);
					fechaLimite = solicitarFechaValida(
						"Ingresa una nueva FECHA LIMITE para la tarea (déjala vacía si no deseas modificarla): "
					);
					modificarTarea(
						indice,
						descripcion,
						indiceCategoria,
						fechaLimite
					);
				}
				break;

			case "C":
				if (tareas.length === 0) {
					console.log(mensajeSinTareas);
				} else {
					indice = solicitarIndiceValido(
						"Ingresa el INDICE de la tarea que deseas actualizar: ",
						tareas.length,
						true
					);
					invertirEstado(indice);
				}
				break;

			case "E":
				if (tareas.length === 0) {
					console.log(mensajeSinTareas);
				} else {
					indice = solicitarIndiceValido(
						"Ingresa el INDICE de la tarea que deseas eliminar: ",
						tareas.length,
						true
					);
					eliminarTarea(indice);
				}
				break;

			case "V":
				if (tareas.length === 0) {
					console.log(mensajeSinTareas);
				} else {
					console.log(
						"Estan son las tareas que cargaste hasta el momento: "
					);
					imprimirTareas(tareas);
				}
				break;

			case "R":
				if (tareas.length === 0) {
					console.log(mensajeSinTareas);
				} else {
					let propiedadOrdenamiento = solicitarPropiedadValida(
						"Elige el dato por el que deseas ordenar las tareas: "
					);
					if (propiedadOrdenamiento == null) {
						console.log(
							"Estan son las tareas que cargaste hasta el momento: "
						);
					} else {
						ordenarTareas(propiedadOrdenamiento);
						console.log(
							`Aqui tienes las tareas ordenadas por ${propiedadOrdenamiento}: `
						);
					}
					imprimirTareas(tareas);
				}
				break;

			case "D":
				if (tareas.length === 0) {
					console.log(mensajeSinTareas);
				} else {
					let descripcion = prompt(
						"Ingresa la descripción que deseas ubicar: "
					);
					while (descripcion.trim().length === 0) {
						descripcion = prompt(
							"Debes ingresar al menos un caracter para poder avanzar: "
						);
					}
					let indice = buscarTarea("descripcion", descripcion);
					console.log(
						indice === -1
							? "No existe ninguna tarea con la descripción proporcionada :/"
							: `La tarea se encuentra en la posicion ${indice}`
					);
				}
				break;

			case "F":
				if (tareas.length === 0) {
					console.log(mensajeSinTareas);
				} else {
					let filtro = armarFiltro();
					let tareasFiltradas = filtrarTareas(filtro);
					if (tareasFiltradas.length === 0) {
						console.log(
							"No existen tareas que coincidan con estas caracteristicas :/"
						);
					} else {
						console.log(
							"Estan son las tareas que coinciden con lo detallado: "
						);
						imprimirTareas(tareasFiltradas);
						console.log(
							"TOTAL DE TAREAS: " + tareasFiltradas.length
						);
					}
				}
				break;

			case "K":
				let nuevaCategoria = solicitarDescripcionValida(
					"Ingresa el nombre de la nueva categoría: ",
					true
				);
				agregarCategoria(nuevaCategoria);
				break;

			case "L":
				listarCategorias();
				break;

			case "O":
				listarOperaciones();
				break;

			case "Q":
				if (tareas.length > 0) {
					console.log(
						"Fue un placer poder serte de ayuda :D Aquí están las tareas que cargaste por si deseas anotarlas en algún otro sitio:"
					);
					imprimirTareas(tareas);
				}
				break;

			default:
				console.log(
					"La cadena ingresada no corresponde a ninguna operación válida :/"
				);
		}
	} while (opcionSeleccionada !== "Q");

	console.log("Hasta la próxima!!");
}

interactuarConUsuario();
