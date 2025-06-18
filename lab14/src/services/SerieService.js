import apiClient from './api';

export const getAllSeriesService = () => {
    return apiClient.get('/series/');
};

export const getSerieService = (id) => {
    return apiClient.get(`/series/${id}/`);
};

export const createSerieService = (data) => {
    return apiClient.post('/series/', data);
};

export const updateSerieService = (id, data) => {
    return apiClient.put(`/series/${id}/`, data);
};

export const deleteSerieService = (id) => {
    return apiClient.delete(`/series/${id}/`);
};