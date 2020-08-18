const url = 'https://api.datos.gob.mx/v1/precio.gasolina.publico';
const total = 1000;

class API {
	async obtenerDatos() {
		//Obtener los datos desde la api
		const datos = await fetch(`${url}?pageSize=${total}`);

		//Retornar datos
		return await datos.json();
	}
}
