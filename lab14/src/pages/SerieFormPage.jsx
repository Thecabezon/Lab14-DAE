
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllCategoriesService } from '../services/CategoryService';
import { getSerieService, createSerieService, updateSerieService } from '../services/SerieService';

function SerieFormPage() {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        release_date: '',
        rating: '',
        category: '',
        image_url: ''
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await getAllCategoriesService();
                setCategories(response.data);
            } catch (err) {
                console.error("Error al cargar categorías:", err);
                setError('No se pudieron cargar las categorías.');
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            const loadSerieData = async () => {
                try {
                    const response = await getSerieService(id);
                    const serie = response.data;
                    setFormData({
                        title: serie.title,
                        description: serie.description,
                        release_date: serie.release_date,
                        rating: serie.rating,
                        category: serie.category.id,
                        image_url: serie.image_url || ''
                    });
                } catch (err) {
                    console.error("Error al cargar la serie:", err);
                    setError('No se pudo cargar la serie para editar.');
                } finally {
                    setLoading(false);
                }
            };
            loadSerieData();
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
        setLoading(true);
        setError('');

        try {
            if (isEditMode) {
                await updateSerieService(id, formData);
            } else {
                await createSerieService(formData);
            }
            navigate('/series');
        } catch (err) {
            console.error("Error al guardar la serie:", err);
            setError('Hubo un problema al guardar. Verifica que todos los campos estén correctos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>{isEditMode ? 'Editar Serie' : 'Nueva Serie'}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && !isEditMode ? ( 
                <p>Cargando formulario...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de estreno</label>
                        <input type="date" name="release_date" className="form-control" value={formData.release_date} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <input type="number" name="rating" className="form-control" value={formData.rating} onChange={handleChange} min="0" max="10" step="0.1" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Categoría</label>
                        <select name="category" className="form-select" value={formData.category} onChange={handleChange} required>
                            <option value="">Selecciona una categoría</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL de imagen</label>
                        <input type="url" name="image_url" className="form-control" value={formData.image_url} onChange={handleChange} />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/series')}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear Serie')}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default SerieFormPage;