const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
	ui.mostrarEstablecimientos();
});

//Habilitar búsquedas de establecimientos
const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
	if (buscador.value.length > 4) {
		//Buscar en la api
		ui.obtenerSugerencias(buscador.value);
	} else {
		ui.mostrarEstablecimientos();
	}
});
