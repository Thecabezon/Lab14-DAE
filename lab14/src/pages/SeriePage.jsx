
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SerieComponent from '../components/SerieComponent';
import { getAllSeriesService, deleteSerieService } from '../services/SerieService';

function SeriePage() {

    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchSeries = async () => {
        setLoading(true);
        try {
            const response = await getAllSeriesService();
            setSeries(response.data);
        } catch (error) {
            console.error("Error al cargar las series:", error);
            setError('No se pudieron cargar las series.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchSeries();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta serie?')) {
            try {
                await deleteSerieService(id);
                fetchSeries();
            } catch (error) {
                console.error("Error al eliminar la serie:", error);
                setError('No se pudo eliminar la serie.');
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Series</h1>
                <Link to="/series/new" className="btn btn-primary">
                    Nueva Serie
                </Link>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {series.length === 0 ? (
                        <div className="col-12">
                            <div className="alert alert-info">
                                No hay series disponibles. ¡Crea una nueva!
                            </div>
                        </div>
                    ) : (
                        series.map(serie => (
                            <div className="col-md-4 mb-3" key={serie.id}>
                                <SerieComponent 
                                    serie={serie} 
                                    onDelete={() => handleDelete(serie.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default SeriePage;