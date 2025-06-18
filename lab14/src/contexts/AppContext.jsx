// src/contexts/AppContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        try {
        const usuarioEnStorage = window.localStorage.getItem('usuario');
        return usuarioEnStorage ? JSON.parse(usuarioEnStorage) : null;
        } catch (error) {
        console.error('Error al leer el usuario del localStorage', error);
        return null;
        }
    });

    useEffect(() => {
        if (usuario) {
        window.localStorage.setItem('usuario', JSON.stringify(usuario));
        } else {
        window.localStorage.removeItem('usuario');
        }
    }, [usuario]);

    const login = (userData) => {
        setUsuario(userData);
    };

    const logout = () => {
        setUsuario(null);
    };

    return (
        <AppContext.Provider value={{ usuario, login, logout }}>
        {children}
        </AppContext.Provider>
    );
};