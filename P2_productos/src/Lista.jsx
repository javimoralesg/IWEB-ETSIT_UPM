import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';


export default function Lista({ productos }) {  

    const navigate = useNavigate();

    return (
        <div id="productosresultados" className="lista">
            {productos.map(producto => (
                <Card bg='secondary' border='dark' style={{ width: '18rem' }} text='white' key={producto.id} className="miproducto">
                    <Card.Img variant="top" src={producto.images[0]} />
                    <Card.Body>
                        <Card.Title style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',}} >{producto.title}</Card.Title>
                        <Card.Text style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',}} >{producto.description}</Card.Text>
                        <Button onClick={() => {navigate(`/products/${producto.id}`)}} variant="light">VER</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

