import { useState } from 'react'
import './App.css'

import Header from './Header.jsx'
import Resultados from './Resultados.jsx'

import CONFIG from './config/config.js'
import { mock1 } from './constants/mock.js'

function App() {
  const [latitud, setLatitud] = useState(CONFIG.default_lat);
  const [longitud, setLongitud] = useState(CONFIG.default_lon);

  const [datos, setDatos] = useState(null);


  const callServer = async (param) => {    
      if(CONFIG.use_server) {
        try {
          const response = await fetch(`${CONFIG.server_url}?key=${CONFIG.api_key}&q=${latitud},${longitud}&days=${CONFIG.num_items_query}`);

          if(response.status === 200) {
            const data = await response.json();
            setDatos(data)
          } else {
            const errorData = await response.json();
            setDatos({ error: errorData.error });
          }

        } catch (error) {
          console.log(error);
          setDatos({ error: {description: error.message} });
        }
      } else {
        setDatos(mock1);
      }
  }

  return (
    <>
      <Header />

      <h2 id='titulo'>El tiempo</h2>

      <div id='busqueda'>
        <div id='criterios'>
          <div className='fila'>   
            <label htmlFor='latitud'>Latitud:</label>
            <input id='latitud' type="number" value={latitud} onChange={(e) => setLatitud(e.target.value)} />
          </div>
          <div className='fila'>
            <label htmlFor='longitud'>Longitud:</label>
            <input id='longitud' type="number" value={longitud} onChange={(e) => setLongitud(e.target.value)} />
          </div>
        </div>
        <button id='buscar' onClick={() => callServer()}>Obtener el tiempo</button>
      </div>

      {/* sin estilo 
        <label htmlFor='latitud'>Latitud:</label>
        <input id='latitud' type="number" value={latitud} onChange={(e) => setLatitud(e.target.value)} />

        <label htmlFor='longitud'>Longitud:</label>
        <input id='longitud' type="number" value={longitud} onChange={(e) => setLongitud(e.target.value)} />

        <button id='buscar' onClick={() => callServer()}>Obtener el tiempo</button>
      */}

      {datos && datos.error && <div id='error'> <h2>Error</h2> <strong>Error:</strong> {datos.error.message} <br></br> <strong>Código:</strong> {datos.error.code}</div>}

      {datos && !datos.error && <Resultados numitems={CONFIG.num_items_show} datos={datos} />}



    </>
  )
}

export default App
