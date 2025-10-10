import Lista from './Lista'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import Location from './Location';

export default function SearchPage({theproducts}) {
  const [filtro, setFiltro] = useState("");
  const [productosFiltradosBusqueda, setProductosFiltradosBusqueda] = useState(theproducts);
  const [productosFiltradosCategoria_Finales, setProductosFiltradosCategoria_Finales] = useState(theproducts);

  const [searchParams, setSearchParams] = useSearchParams({ category: "All" });

  const filtrar = () => {
    if (filtro === ""){
      setProductosFiltradosBusqueda(theproducts);
    } else {
      const productosProvisionales = theproducts.filter( product => product.title.toLowerCase().includes(filtro.toLowerCase()) );
      setProductosFiltradosBusqueda(productosProvisionales);
    }
  }

  useEffect( () => {
    if ( searchParams.get("category") === "All"){
      setProductosFiltradosCategoria_Finales(productosFiltradosBusqueda);
    } else {
      const productosProvisionales = productosFiltradosBusqueda.filter( product => product.category === searchParams.get("category") );
      setProductosFiltradosCategoria_Finales(productosProvisionales);
    }
    
  }, [searchParams.get("category"), productosFiltradosBusqueda]);

  return (
    <>
      <Location />

      <div className="titular">
        <div className="busqueda">
            <h2 id="catálogo">Buscar en el catálogo</h2>
            <input id="filtro" type="text" placeholder='Buscar...' value={filtro} onChange={e => setFiltro(e.target.value)} />
            <button id="buscador" onClick={() => filtrar()}>Buscar</button>
        </div>
        <div className="busqueda">
            <h2 id="catálogo">Filtrar por categoría</h2>
            <select id="miselector" value={searchParams.get("category")} onChange={e => setSearchParams({ category: e.target.value } )}>
              <option value="All">Todas las categorías</option>
              {theproducts.reduce((acc, producto) => {
                if (!acc.includes(producto.category)) {
                  acc.push(producto.category);
                }
                return acc;
              }, []).map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
        </div>
      </div>

      <Lista productos={searchParams.get("category") === null ? productosFiltradosBusqueda : productosFiltradosCategoria_Finales } />       
        
    </>
  );
}
