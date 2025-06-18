import apiClient from './api';

export const getAllCategoriesService = () => {
    return apiClient.get('/categories/');
};

export const getCategoryService = (id) => {
    return apiClient.get(`/categories/${id}/`);
};

export const createCategoryService = (data) => {
    return apiClient.post('/categories/', data);
};

export const updateCategoryService = (id, data) => {
    return apiClient.put(`/categories/${id}/`, data);
};

export const deleteCategoryService = (id) => {
    return apiClient.delete(`/categories/${id}/`);
};