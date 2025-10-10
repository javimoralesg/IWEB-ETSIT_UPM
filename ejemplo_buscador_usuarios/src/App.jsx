import { useState } from 'react'
import './App.css'

import Header from './Header'
import Resultados from './Resultados'

import { mock1 } from './constants/users'
import CONFIG from './config/config'


function App() {
  const [resultados, setResultados] = useState(null);
  const [query, setQuery] = useState("");
  
  const callServer = async (param) => {    
      if(CONFIG.use_server) {
        try {
          let queryparams = "";
          if(param==="all"){
            queryparams = "?limit=" + CONFIG.num_items;
          } else {
            queryparams = "/search?q=" + query;
          }
          const response = await fetch(`${CONFIG.server_url}${queryparams}`);
          const data = await response.json();         
          //console.log(data);
          setResultados(data.users);
        } catch (error) {
          console.log(error);
          setResultados({ error: {description: error.message} });
        }
      } else {
        //console.log(mock1.users)
        setResultados(mock1.users);
      }
  }

  
  return (
    <>
      <Header />

      <h2 id='buscador'>Buscador de usuarios</h2>
      <input id='query' type="text" placeholder="Escribe tu búsqueda aquí" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button id='botonsearch' onClick={() => callServer()}>Buscar</button>

      <button id='botonall' onClick={() => callServer("all")}>Ver todos</button>

      {resultados && <Resultados resultado={resultados} />}
    </>
  )
}

export default App
