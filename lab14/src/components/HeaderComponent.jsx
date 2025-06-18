// src/components/HeaderComponent.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

function HeaderComponent() {
    const { usuario, logout } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">SeriesApp</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/categories">Categorías</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/series">Series</NavLink>
                        </li>
                    </ul>
                    {usuario ? (
                        <div className="d-flex align-items-center">
                            <span className="navbar-text me-3">
                                Bienvenido, {usuario.first_name || usuario.username}
                            </span>
                            <button className="btn btn-outline-primary" onClick={handleLogout}>
                                Salir
                            </button>
                        </div>
                    ) : (
                        <NavLink className="btn btn-primary" to="/">Iniciar Sesión</NavLink>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default HeaderComponent