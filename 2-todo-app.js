// LISTA DE TAREAS POR HACER

// npm i prompt-sync
const prompt = require("prompt-sync")({ sigint: true });

let tareas = [];
let UID = 0;
let categorias = ["Personal", "Trabajo"];

// Funciones auxiliares

function obtenerIdentificador() {
	UID++;
	return UID;
}

function identificadoresValidos() {
	return tareas.map((tarea) => tarea.identificador);
}

function indiceEsValido(indice, longitudArreglo) {
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

/** Devuelve un identificador correctamente validado */
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

function solicitarIdentificadorValido(mensaje) {
	let identificador = parseInt(prompt(mensaje).trim());
	while (!identificadoresValidos().includes(identificador)) {
		console.log("Estas son las tareas que cargaste hasta el momento: ");
		imprimirTareas(tareas);
		identificador = parseInt(
			prompt(
				`Por favor, ingresa algún identificador del listado anterior: `
			).trim()
		);
	}
	return identificador;
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
	console.log("Estas son las propiedades por las que puedes ordenar:");
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
			"Dato inválido... Por favor, ingresa una letra del listado anterior o déjalo vacío: "
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

function agregarTarea(descripcion, indiceCategoria, fechaLimite) {
	tareas.push({
		identificador: obtenerIdentificador(),
		descripcion: descripcion,
		indiceCategoria: indiceCategoria,
		fechaLimite: fechaLimite,
		completada: false,
	});
	console.log("La tarea fue agregada correctamente :D");
}

function modificarTarea(
	identificador,
	descripcion,
	indiceCategoria,
	fechaLimite
) {
	let indice = tareas.findIndex(
		(tarea) => tarea.identificador === identificador
	);
	tareas[indice].descripcion = descripcion ?? tareas[indice].descripcion;
	tareas[indice].indiceCategoria =
		indiceCategoria ?? tareas[indice].categoria;
	tareas[indice].fechaLimite =
		fechaLimite !== "99/99/9999" ? fechaLimite : tareas[indice].fechaLimite;
	console.log("Los cambios solicitados se aplicaron correctamente :D");
}

function eliminarTarea(identificador) {
	let indice = tareas.findIndex(
		(tarea) => tarea.identificador === identificador
	);
	tareas.splice(indice, 1);
	console.log("La tarea fue eliminada correctamente :D");
}

function invertirEstado(identificador) {
	let indice = tareas.findIndex(
		(tarea) => tarea.identificador === identificador
	);
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
		console.log(
			tareas[indice].identificador +
				". " +
				tareas[indice].descripcion +
				categoriaFormateada +
				fechaFormateada +
				estado
		);
	}
}

function agregarCategoria(descripcion) {
	categorias.push(descripcion);
	console.log("La categoría fue agregada correctamente :D");
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
	// TODO: Guardar fechas con tipo Date
	if (tareas.length !== 0 && !(propiedad in tareas[0])) {
		console.log("Propiedad inválida");
		return;
	}
	let tareasOrdenadas = tareas.slice();
	let indiceFinal = tareasOrdenadas.length - 1;
	while (indiceFinal > 0) {
		let aux;
		for (let i = 0; i < indiceFinal; i++) {
			// Alternar operador para ordenar de mayor a menor
			if (tareasOrdenadas[i][propiedad] > tareasOrdenadas[i + 1][propiedad]) {
				aux = tareasOrdenadas[i];
				tareasOrdenadas[i] = tareasOrdenadas[i + 1];
				tareasOrdenadas[i + 1] = aux;
			}
		}
		// Optimización para no validar contra últimos valores
		indiceFinal -= 1;
	}
	return tareasOrdenadas;
}

/**
 * Busca una la tarea en base a la propiedad definida, usando busqueda binaria.
 * @param {string} nombrePropiedad La propiedad por la cual se desea buscar
 * @param {string} valor El valor que se desea buscar
 * @returns {number} El identificador de la tarea o -1 si no se encontró
 */
function buscarIdentificadorTarea(nombrePropiedad, valor) {
	let tareasOrdenadas = ordenarTareas(nombrePropiedad);
	let indiceInicial = 0;
	let indiceFinal = tareasOrdenadas.length - 1;
	while (indiceInicial <= indiceFinal) {
		let indiceMedio = Math.floor((indiceInicial + indiceFinal) / 2);
		if (tareasOrdenadas[indiceMedio][nombrePropiedad] === valor) {
			return tareasOrdenadas[indiceMedio].identificador;
		}
		if (tareasOrdenadas[indiceMedio][nombrePropiedad] > valor) {
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
	console.log("   D. Buscar tarea por Descripción\n");

	console.log("   C. Cambiar estado de una tarea");
	console.log("   N. Crear nueva tarea");
	console.log("   M. Modificar tarea");
	console.log("   E. Eliminar tarea\n");

	console.log("   K. Crear categoria");
	console.log("   L. Listar categorias");

	console.log("   O. Ver operaciones disponibles");

	console.log("   Q. Cerrar aplicación");
}

function interactuarConUsuario() {
	console.log("Bienvenido/a a tu gestor de tareas.");
	let opcionSeleccionada;
	let identificador;
	let descripcion;
	let indiceCategoria;
	let fechaLimite;
	let mensajeSinTareas =
		"Aún no tienes tareas cargadas :/ Por favor, carga alguna y vuelve a ejecutar la operación...";
	listarOperaciones();
	do {
		opcionSeleccionada = prompt(
			"\nPor favor, ingresa la letra de la OPERACION que deseas: "
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
					identificador = solicitarIdentificadorValido(
						"Ingresa el IDENTIFICADOR de la tarea que deseas modificar: "
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
						identificador,
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
					identificador = solicitarIdentificadorValido(
						"Ingresa el IDENTIFICADOR de la tarea que deseas actualizar: "
					);
					invertirEstado(identificador);
				}
				break;

			case "E":
				if (tareas.length === 0) {
					console.log(mensajeSinTareas);
				} else {
					identificador = solicitarIdentificadorValido(
						"Ingresa el IDENTIFICADOR de la tarea que deseas eliminar: "
					);
					eliminarTarea(identificador);
				}
				break;

			case "V":
				if (tareas.length === 0) {
					console.log(mensajeSinTareas);
				} else {
					let propiedadOrdenamiento = solicitarPropiedadValida(
						"Elige la propiedad por la que deseas ordenar tus tareas (opcional): "
					);
					let tareasOrdenadas = propiedadOrdenamiento === null ? tareas : ordenarTareas(propiedadOrdenamiento);
					console.log(
						"Estan son las tareas que cargaste hasta el momento: "
					);
					imprimirTareas(tareasOrdenadas);
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
					identificador = buscarIdentificadorTarea(
						"descripcion",
						descripcion
					);
					console.log(
						identificador === -1
							? "No existe ninguna tarea con la descripción proporcionada :/"
							: `La tarea tiene el identificador ${identificador}`
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
