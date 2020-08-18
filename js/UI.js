class UI {
	constructor() {
		//instanciar la api
		this.api = new API();

		//Crear los markers con layerGroup
		this.markers = new L.LayerGroup();

		// Iniciar el mapa
		this.mapa = this.inicializarMapa();
	}

	inicializarMapa() {
		// Inicializar y obtener la propiedad del mapa
		const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
		const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; ' + enlaceMapa + ' Contributors',
			maxZoom: 18,
		}).addTo(map);
		return map;
	}

	mostrarEstablecimientos() {
		this.api.obtenerDatos().then((datos) => {
			this.mostrarPines(datos.results);
		});
	}

	mostrarPines(datos) {
		//Limpiar markers
		this.markers.clearLayers();

		//Recorrer los establecimientos
		datos.forEach((dato) => {
			//Destructuring
			const { latitude, longitude, calle, regular, premium } = dato;

			const opcionesPopUp = L.popup().setContent(`
                    <p>Calle: ${calle}</p>
                    <p><b>Regular:</b> ${regular}</p>
                    <p><b>Premium:</b> ${premium}</p>
                `);

			const marker = new L.marker([parseFloat(latitude), parseFloat(longitude)]).bindPopup(opcionesPopUp);
			this.markers.addLayer(marker);
		});
		this.markers.addTo(this.mapa);
	}

	//Buscador
	obtenerSugerencias(busqueda) {
		this.api.obtenerDatos().then((datos) => {
			//obtener datos
			const resultados = datos.results;
			//Enviar los resultados y la búsqueda para el filtrado
			this.filtrarSugerencias(resultados, busqueda);
		});
	}

	//Filtrado
	filtrarSugerencias(resultado, busqueda) {
		//filtrar con .filter
		const filtro = resultado.filter((filtro) => filtro.calle.indexOf(busqueda) !== -1);
		//mostrar pines
		this.mostrarPines(filtro);
	}
}
