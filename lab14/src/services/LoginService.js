// src/services/LoginService.js
import apiClient from './api'; // <-- Importamos tu instancia de Axios

export const loginService = async (credentials) => {
    try {
        // Usamos apiClient.post, que ya tiene la baseURL configurada
        // Axios automáticamente maneja la serialización a JSON
        const response = await apiClient.post('/login/', credentials);
        // Con Axios, los datos exitosos están en response.data
        return response.data;
    } catch (error) {
        console.error('Error en el servicio de login:', error);
        // Axios guarda los detalles del error en error.response
        if (error.response && error.response.data) {
            // Re-lanzamos el mensaje de error que viene del backend
            throw new Error(error.response.data.error || 'Error de autenticación');
        }
        // Si no hay respuesta del servidor (ej. error de red)
        throw new Error('No se pudo conectar con el servidor.');
    }
};