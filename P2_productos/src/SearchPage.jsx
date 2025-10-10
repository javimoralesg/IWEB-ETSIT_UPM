import Lista from './Lista'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import Location from './Location';

export default function SearchPage({theproducts}) {
  const [searchParams, setSearchParams] = useSearchParams({ category: "All" });

  const [filtro, setFiltro] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState(theproducts);
  const [hayFiltro, setHayFiltro] = useState(false);

  const [productosFinales, setProductosFinales] = useState(theproducts);


  useEffect(() => {
    if(filtro.trim() === "") {
      setHayFiltro(false);
    }
  }, [filtro]);

  const filtrar = () => {
    const filtrarPor = filtro.trim(); //quito espacios en blanco
    setHayFiltro(true);
    const filteredProducts = theproducts.filter(producto => 
      producto.title.toLowerCase().includes(filtrarPor.toLowerCase())
    );
    setProductosFiltrados(filteredProducts);
  }

  useEffect(() => {  
    setProductosFinales(hayFiltro ? productosFiltrados : theproducts);
  }, [hayFiltro]);

  useEffect(() => {
    if(searchParams.get("category") === "All") {
      setProductosFinales(hayFiltro ? productosFiltrados : theproducts);  
    } else {
      const filteredByCategory = (hayFiltro ? productosFiltrados : theproducts).filter(producto => producto.category === searchParams.get("category"));
      setProductosFinales(filteredByCategory);
    }
    
  }, [searchParams.get("category"), hayFiltro]);

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


      <Lista productos={productosFinales} />       
        
    </>
  );
}
