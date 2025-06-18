
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoryComponent from '../components/CategoryComponent';
import { getAllCategoriesService, deleteCategoryService } from '../services/CategoryService';

function CategoryPage() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getAllCategoriesService();
            setCategories(response.data);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            setError('No se pudieron cargar las categorías.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);
    
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
            try {
                await deleteCategoryService(id);
                fetchCategories();
            } catch (error) {
                console.error('Error al eliminar categoría:', error);
                const errorMsg = error.response?.data?.error || 'No se pudo eliminar la categoría. Es posible que tenga series asociadas.';
                setError(errorMsg);
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Categorías</h1>
                <Link to="/categories/new" className="btn btn-primary">
                    Nueva Categoría
                </Link>
            </div>
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {categories.length === 0 ? (
                        <div className="col-12">
                            <div className="alert alert-info">
                                No hay categorías disponibles. ¡Crea una nueva!
                            </div>
                        </div>
                    ) : (
                        categories.map(category => (
                            <div className="col-md-4 mb-3" key={category.id}>
                                <CategoryComponent 
                                    category={category}
                                    onDelete={() => handleDelete(category.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default CategoryPage;