const contenedor = document.querySelector('.container');
const divResultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

let ciudad;
let pais;

window.addEventListener('load' , () => {

	formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
	e.preventDefault();

	ciudad = document.querySelector('#ciudad').value;
	pais = document.querySelector('#pais').value;

	if(!validarCampos()){
		mostrarAlerta('Todos los campos son obligatorios');
		return;
	}

	consultarAPI(ciudad, pais);
}

function validarCampos() {

	if(ciudad === '' || pais === '') return false;
		else return true;
}

function mostrarAlerta(mensaje) {

	const divAlerta = document.querySelector('.bg-red-100');
	
	if(divAlerta)
		return;

	const alerta = document.createElement('div');

	alerta.classList.add('bg-red-100' , 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

	alerta.innerHTML = `
		<strong class="font-bold">Error!</strong>
		<span class="block">${mensaje}</span>
	`;

	contenedor.appendChild(alerta);

	setTimeout(() => {
		alerta.remove();
	}, 3000)
}

function consultarAPI(ciudad, pais) {

	const appId = '6bc86ad7b8a5ee993330b07fdf1eed47';
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
	
	spinner();

	fetch(url)
		.then(respuesta => respuesta.json())
		.then(resultado => {

			if(resultado.cod === '404'){
				mostrarAlerta('Ciudad no encontrada.');
				return;
			}

			limpiarHTML();
			mostrarClima(resultado);
		});
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function mostrarClima(datos) {

	const { name, main : { temp, temp_max, temp_min } } = datos;

	const centigradosActual = kelvinACentigrados(temp);
	const centigradosMax = kelvinACentigrados(temp_max);
	const centigradosMin = kelvinACentigrados(temp_min);

	const ciudad = document.createElement('p');
	ciudad.textContent = `${name}`;
	ciudad.classList.add('font-bold', 'text-6xl');

	const actual = document.createElement('p');
	actual.innerHTML = `${centigradosActual} &#8451;`;
	actual.classList.add('font-bold', 'text-6xl');

	const maxima = document.createElement('p');
	maxima.innerHTML = `Maxima: ${centigradosMax} &#8451;`;
	maxima.classList.add('font-bold', 'text-3xl');

	const minima = document.createElement('p');
	minima.innerHTML = `Minima: ${centigradosMin} &#8451;`;
	minima.classList.add('font-bold', 'text-3xl');

	const resultado = document.createElement('div');
	resultado.classList.add('div-temp', 'text-center', 'text-white');
	resultado.appendChild(ciudad);
	resultado.appendChild(actual);
	resultado.appendChild(maxima);
	resultado.appendChild(minima);

	divResultado.appendChild(resultado);
}

function limpiarHTML() {
	while(divResultado.firstChild) {
		divResultado.removeChild(divResultado.firstChild);
	}
}

function spinner() {

	limpiarHTML();

	const divSpinner = document.createElement('div');
	divSpinner.classList.add('sk-fading-circle');

	divSpinner.innerHTML = `
		<div class="sk-circle1 sk-circle"></div>
		<div class="sk-circle2 sk-circle"></div>
		<div class="sk-circle3 sk-circle"></div>
		<div class="sk-circle4 sk-circle"></div>
		<div class="sk-circle5 sk-circle"></div>
		<div class="sk-circle6 sk-circle"></div>
		<div class="sk-circle7 sk-circle"></div>
		<div class="sk-circle8 sk-circle"></div>
		<div class="sk-circle9 sk-circle"></div>
		<div class="sk-circle10 sk-circle"></div>
		<div class="sk-circle11 sk-circle"></div>
		<div class="sk-circle12 sk-circle"></div>
	`;

	divResultado.appendChild(divSpinner);
}