import { useState } from 'react'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router'


import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import  CONFIG  from './config/config'
import {mockdata} from './constants/products'

import Header from './Header'
import SearchPage from './SearchPage'
import ProductPage from './ProductPage'
import NoMatch from './NoMatch'


function App() {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState(null);

  const callServer = async () => {    
      if(CONFIG.use_server) {
        try {
          const response = await fetch(`${CONFIG.server_url}?limit=${CONFIG.num_items}`);
          if (response.status === 200) {
            const data = await response.json();
            setProductos(data.products);
          } else {
            console.log('Respuesta de red OK pero respuesta HTTP no OK');
          }
        } catch (error) {
          console.log(error);
          alert("No se ha podido recuperar la información.");
        }
      } else {
        setProductos(mockdata.products);
      }
  }

  useEffect(() => {
    async function fetchData() {
      await callServer();
				
			setTimeout(()=>{
				setLoading(false);
			},500);		
    }

    fetchData();
  }, []);
	

  return (
    <>
      {loading ? <><img id="myspinner" className='loading' src='/spinner.gif' style={{ width: '200px', height: '200px' }} /><br/> Cargando...</> : <>
    
        <Header />

        <Routes>
          <Route path="/products/:productId" element={<ProductPage theproducts={productos} />} />
          <Route path="/" element={<SearchPage theproducts={productos} />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      
      </>}
    </>
  )
}

export default App
