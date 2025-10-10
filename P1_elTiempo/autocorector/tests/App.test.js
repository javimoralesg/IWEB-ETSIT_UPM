/*
expect matchers: https://jestjs.io/docs/expect
custom DOM matchers for expect: https://github.com/testing-library/jest-dom
*/
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import App from '../../src/App';
import Header from '../../src/Header';
import Resultados from '../../src/Resultados';
import user_info from '../../user.json';
import {mock1} from '../utils/mock';
import {mock3} from '../utils/mock3';

const mytestconfig = {
  server_url: "http://api.weatherapi.com/v1/forecast.json",
  api_key: "apikeyfake_nohacefaltaporquehagomockdefetch",
  num_items_query: 8,
  num_items_show: 7,
  default_lat: 41.416775,
  default_lon: -4.703790,
  use_server: false,
  force_error: false  
};

jest.setTimeout(10000);

jest.mock('../../src/config/config', () => ( {
  __esModule: true,
  default: mytestconfig  
} ));

afterAll(() => jest.resetAllMocks());


let testinfo = {
    name: "La aplicación tiene un componente Header con el logo y el mensaje de bienvenida con tu nombre",
    score: 1,
    msg_ok: "Header encontrada",
    msg_error: "Header no encontrada o no es como se esperaba, revise el enunciado"
}
test(JSON.stringify(testinfo), () => {
  render(<Header />);
  const cabecera = document.querySelector('#micabecera');
  const logo = document.querySelector('.milogo');
  const mensaje = document.querySelector('#mensaje');

  expect(cabecera).toBeInTheDocument();
  expect(user_info).toHaveProperty('name');
  expect(user_info).toHaveProperty('email');
  expect(user_info).toHaveProperty('token');
  expect(mensaje).toHaveTextContent(new RegExp(user_info.name, 'i'));
  expect(cabecera.tagName).toBe('DIV');
  expect(cabecera).toContainElement(logo);
  expect(cabecera).toContainElement(mensaje);
});

testinfo = {
  name: "La aplicación tiene un h2 con id 'titulo' y el texto 'El tiempo'",
  score: 0.5,
  msg_ok: "h2 con id 'titulo' y con el texto 'El tiempo' encontrado",
  msg_error: "h2 con id 'titulo' y con el texto 'El tiempo' NO encontrado"
}
test(JSON.stringify(testinfo), () => {
  render(<App />);
  const eltiempo = document.querySelector('#titulo');
  expect(eltiempo).toBeInTheDocument();
  expect(eltiempo).toHaveTextContent(/El tiempo/i);
  expect(eltiempo.tagName).toBe('H2');
});

testinfo = {
  name: "La aplicación tiene los input para que el usuario introduzca la latitud y la longitud y el botón buscar. Los input latitud y longitud inicializan con los valores por defecto indicados en el fichero de configuración",
  score: 1,
  msg_ok: "Campos latitud y longitud y botón buscar encontrados y con los valores por defecto correctos",
  msg_error: "Campos latitud y longitud y botón buscar NO encontrados o NO contienen los valores por defecto"
}
test(JSON.stringify(testinfo), () => {
  render(<App />);
  const lat = document.querySelector('#latitud');
  const lon = document.querySelector('#longitud');
  const buscar = document.querySelector('#buscar');

  expect(lat).toBeInTheDocument();
  expect(lat.tagName).toBe('INPUT');
  expect(lon).toBeInTheDocument();
  expect(lon.tagName).toBe('INPUT');
  expect(buscar).toBeInTheDocument();
  expect(buscar.tagName).toBe('BUTTON');
  expect(lat).toHaveValue(mytestconfig.default_lat);
  expect(lon).toHaveValue(mytestconfig.default_lon);  
});


testinfo = {
  name: "Los input latitud y longitud cambian cuando el usuario escribe en ellos",
  score: 1,
  msg_ok: "Campos latitud y longitud cambian adecuadamente",
  msg_error: "Campos latitud y longitud NO cambian adecuadamente con los valores que introduce el usuario"
}
test(JSON.stringify(testinfo), () => {
  render(<App />);
  const lat = document.querySelector('#latitud');
  const lon = document.querySelector('#longitud');
  fireEvent.change(lat, {target: {value: 45.6}})
  fireEvent.change(lon, {target: {value: -15.6}})
  expect(lat).toHaveValue(45.6);
  expect(lon).toHaveValue(-15.6);  
});



testinfo = {
  name: "El componente 'Resultados' recibe dos atributos (props) 'numitems' que indica cuantas tarjetas debe mostrar y 'datos' con los datos que debe renderizar",
  score: 2,
  msg_ok: "Componente Resultados funciona adecuadamente",
  msg_error: "Componente Resultadoss NO funciona correctamente"
}
test(JSON.stringify(testinfo), async () => {
  render(<Resultados numitems={6} datos={mock3} />);
  const resultado = document.querySelector('#resultados');
  expect(resultado).toBeInTheDocument();  
  expect(resultado).toHaveTextContent(/El tiempo/i);
  expect(resultado).toHaveTextContent(/Langenzenn/);
  expect(resultado).toHaveTextContent(/Europe\/Berlin/);
  expect(resultado).toHaveTextContent("23/9/2024");
  expect(resultado).toHaveTextContent("28/9/2024");
  const imagenes = document.querySelectorAll('.tiempoimg');
  expect(imagenes).toHaveLength(6);
});


testinfo = {
  name: "La aplicación al hacer click en 'buscar' carga los datos de constants/mock.js si en la configuración se indica que no se use el servidor",
  score: 1,
  msg_ok: "Datos de mock.js cargados adecuadamente",
  msg_error: "Datos de mock.js NO renderizados correctamente"
}
test(JSON.stringify(testinfo), async () => {
  render(<App />);
  const buscar = document.querySelector('#buscar');
  fireEvent.click(buscar);
  //espero a que cargue los resultados, para ello uso scren.getAllByText que devuelve una promesa
  await waitFor(() => screen.getAllByText(/2024/i));
  const resultado = document.querySelector('#resultados');
  expect(resultado).toBeInTheDocument();
  expect(resultado).toHaveTextContent(/El tiempo/i);
  expect(resultado).toHaveTextContent(/Lemsid/);
  expect(resultado).toHaveTextContent(/Africa\/El_Aaiun/);
  expect(resultado).toHaveTextContent("23/9/2024");
  expect(resultado).toHaveTextContent("29/9/2024");
  const imagenes = document.querySelectorAll('.tiempoimg');
  expect(imagenes).toHaveLength(mytestconfig.num_items_show);
});

