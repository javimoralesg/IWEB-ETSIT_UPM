export default function Resultados(props) {
    return (
        <div>
            <h2>Resultados de la búsqueda:</h2>
            <ul id="resultados">
                {props.resultado.map(user => (
                    <li key={user.id}>
                        <p>Nombre: <b>{user.firstName} {user.lastName}</b>  Email: <b>{user.email}</b></p>
                    </li>
                ))}
            </ul>
        </div>
    )
}