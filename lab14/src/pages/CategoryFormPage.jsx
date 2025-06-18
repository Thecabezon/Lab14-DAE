
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoryService, createCategoryService, updateCategoryService } from '../services/CategoryService';

function CategoryFormPage() {

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            const loadCategory = async () => {
                try {
                    const response = await getCategoryService(id);
                    setFormData({
                        name: response.data.name,
                        description: response.data.description || ''
                    });
                } catch (error) {
                    setError('No se pudo cargar la categoría para editar.');
                } finally {
                    setLoading(false);
                }
            };
            loadCategory();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setError('El nombre de la categoría es obligatorio.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (isEditMode) {
                await updateCategoryService(id, formData);
            } else {
                await createCategoryService(formData);
            }
            navigate('/categories');
        } catch (err) {
            console.error("Error al guardar la categoría:", err);
            setError('No se pudo guardar la categoría. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>{isEditMode ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}

            {loading && !isEditMode ? (
                <p>Cargando...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Nombre</label>
                        <input
                            id="categoryName"
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryDescription" className="form-label">Descripción</label>
                        <textarea
                            id="categoryDescription"
                            name="description"
                            className="form-control"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/categories')}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear Categoría')}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default CategoryFormPage;