import { Link, useParams } from 'react-router';
import { useState } from 'react';
import Location from './Location';
import ReactMarkdown from 'react-markdown';

export default function ProductPage({ theproducts }) {
    const { productId } = useParams();
    const [summary, setSummary] = useState("");

    const GROQ_API_KEY = "YOUR_GROQ_API_KEY_HERE";
    const [loading, setLoading] = useState(false);

    const productoMostrar = theproducts.find(({id}) => { return id === Number(productId)});

    // Calcular precio con descuento
    const precioOriginal = productoMostrar.price;
    const descuento = productoMostrar.discountPercentage;
    const precioConDescuento = (precioOriginal * (1 - descuento / 100)).toFixed(2);

    // Renderizar estrellas de rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} className="star full">★</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>);
        }
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
        }
        return stars;
    };


    // Función para generar resumen de opiniones con IA
    const makeSummary = async (reviews) => {
        setLoading(true);
        const prompt = `Crea un resumen de los siguientes comentarios de un producto. 
                        El producto es ${productoMostrar.title}. 
                        Los comentarios son: ${reviews.slice(-3).reverse().map(review => (
                            `\n- ${review.comment} (Rating: ${review.rating}/5)`
        ))}`;

        try {
                const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
                },
                body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{
                    role: "user",
                    content: prompt
                }]
                })
            });
        
            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                setSummary(data.choices[0].message.content);
            } else {
                setError('No se pudo obtener una recomendación. Intenta de nuevo.');
            }
        } catch (err) {
        setError('Ocurrió un error. Por favor, intenta de nuevo.');
        } finally {
        setLoading(false);
        }
    };

    return (
        <>
            <Location />

            
            <div className="product-detail-content">
                <div className="product-image-wrapper">
                    <div className="product-image-section">
                        <img src={productoMostrar.images[0]} alt={productoMostrar.title} className="product-detail-image" />
                                               
                        {productoMostrar.discountPercentage > 0 && (<span className="discount-badge"> -{productoMostrar.discountPercentage}% </span>)}
                    </div>
                    
                    <Link to="/"> <button id='volver'>Volver</button> </Link>
                </div>

                <div className="product-info-section">
                    <h2 id='titulo' className="product-detail-title"> {productoMostrar.title} </h2>

                    {/* Descripción */}
                    <div className="product-description">
                        <h3>Descripción</h3>
                        <p>{productoMostrar.description}</p>
                    </div>

                    {/* Rating, Precio y Stock en flex */}
                    <div className="product-flex-info">
                        {/* Rating */}
                        <div className="product-rating">
                            <span className="stars"> {renderStars(productoMostrar.rating)} </span>
                            <span className="rating-value">{productoMostrar.rating} / 5.0</span>
                        </div>

                        {/* Precio */}
                        <div className="product-price">
                            <div className="price-container">
                                {productoMostrar.discountPercentage > 0 ? (
                                    <>
                                        <span className="price-original">{precioOriginal} €</span>
                                        <span className="price-value">{precioConDescuento} €</span>
                                    </>
                                ) : (
                                    <span className="price-value">{precioOriginal} €</span>
                                )}
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="product-stock">
                            <div className={`stock-status ${productoMostrar.stock <= 10 ? 'low-stock' : 'in-stock'}`}>
                                <span className="stock-text">
                                    {productoMostrar.availabilityStatus} - {productoMostrar.stock} unidades disponibles
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Comentarios */}
                    {productoMostrar.reviews && (
                        <div id="comments">
                            <div>
                                <span id='mediaresultadocomentarios'>
                                    Media de comentarios: <span id="mediaresult">{(productoMostrar.reviews.reduce((acc, review) => acc + review.rating, 0) / productoMostrar.reviews.length).toFixed(2)} </span>/ 5.0
                                </span>
                            </div>

                            <div>
                                <button id="summarybtn" onClick={() => makeSummary(productoMostrar.reviews)}>Generar resumen de opiniones</button>
                                {loading && <p id='loading'>Generando resumen...</p>}
                                {summary !== "" && <div className="summary"><ReactMarkdown>{summary}</ReactMarkdown></div>}
                            </div>

                            <h5>Últimos 3 comentarios:</h5>

                            {productoMostrar.reviews.slice(-3).reverse().map((review, index) => (
                                <div key={index} className="comment">
                                    <div className="comment-header">
                                        <span className="comment-author">{review.reviewerName}  <small>({review.date})</small>:</span> 
                                        <span className="comment-rating">Rating: {review.rating}/5</span>
                                    </div>
                                    <p className="comment-text">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    
                </div>
            </div>
            
        </>
    );
}