
import { useNavigate } from "react-router-dom";

function CategoryComponent({ category, onDelete }) {
    const navigate = useNavigate();

    const gotoUrl = (codigo) => {
        navigate("/categories/edit/" + codigo);
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.description || 'Sin descripción'}</p>
                <div className="d-flex justify-content-between">
                    <button 
                        onClick={() => gotoUrl(category.id)}
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

export default CategoryComponent;