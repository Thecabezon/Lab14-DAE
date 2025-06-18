
import { useNavigate } from "react-router-dom";

function SerieComponent({ serie, onDelete }) {
    const navigate = useNavigate();

    const gotoUrl = (codigo) => {
        navigate("/series/edit/" + codigo);
    }

    return (
        <div className="card h-100">
            <img 
                src={serie.image_url || "https://via.placeholder.com/400x250?text=Sin+Imagen"} 
                className="card-img-top" 
                alt={serie.title} 
                style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{serie.title}</h5>
                <p className="card-text mb-1"><strong>Fecha de estreno:</strong> {serie.release_date}</p>
                <p className="card-text mb-1"><strong>Rating:</strong> {serie.rating}</p>
                <p className="card-text"><strong>Categoría:</strong> {serie.category.name}</p>
                
                <div className="d-flex justify-content-between mt-auto">
                    <button 
                        onClick={() => gotoUrl(serie.id)}
                        className="btn btn-secondary"
                    >
                        Editar
                    </button>
                    <button 
                        onClick={onDelete}
                        className="btn btn-danger"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SerieComponent;