import { Link } from "react-router";

export default function NoMatch() {
    return (
        <div id="nomatch">
            <h2 id="info" >Ruta no encontrada</h2>
            <img src="/404.png" alt="Not Found" style={{ maxWidth: '300px' ,padding: '1.5em'}} />
            <br></br>
            <Link to="/" id="volver">Volver al inicio</Link>
        </div>
    );
}