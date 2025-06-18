// src/pages/LoginPage.jsx
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { loginService } from "../services/LoginService";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useContext(AppContext);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await loginService({ username, password });
            console.log("Respuesta del servicio web:", data); // Para verificar en consola
            login(data);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    }

    const onChangeUserName = (e) => setUsername(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    return (
        <section className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="container">
                <div className="row justify-content-sm-center">
                    <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <form onSubmit={handleSubmit} autoComplete="off">
                                    <div className="mb-3">
                                        <label className="mb-2 text-muted" htmlFor="username">Usuario</label>
                                        <input id="username" type="text" className="form-control" name="username" required autoFocus 
                                            value={username}
                                            onChange={onChangeUserName}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <div className="mb-2 w-100">
                                            <label className="text-muted" htmlFor="password">Contraseña</label>
                                            
                                        </div>
                                        <input id="password" type="password" className="form-control" name="password" required 
                                            value={password}
                                            onChange={onChangePassword}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button type="submit" className="btn btn-primary ms-auto">
                                            Ingresar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="text-center mt-5 text-muted">
                            Copyright © Tecsup 2024
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;