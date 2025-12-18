import axios from 'axios';

// Configure axios for Laravel Sanctum
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
});

// Get CSRF token from meta tag or cookie
const getCSRFToken = () => {
    const token = document.head.querySelector('meta[name="csrf-token"]');
    return token ? token.content : null;
};

// Add CSRF token to all requests
api.interceptors.request.use(config => {
    const token = getCSRFToken();
    if (token) {
        config.headers['X-CSRF-TOKEN'] = token;
    }
    return config;
});

// Resumes
export const resumeApi = {
    getAll: () => api.get('/resumes'),
    get: (id) => api.get(`/resumes/${id}`),
    create: (data) => api.post('/resumes', data),
    update: (id, data) => api.put(`/resumes/${id}`, data),
    delete: (id) => api.delete(`/resumes/${id}`),
};

// Work Experiences
export const workExperienceApi = {
    getAll: (resumeId) => api.get(`/resumes/${resumeId}/work-experiences`),
    get: (resumeId, id) => api.get(`/resumes/${resumeId}/work-experiences/${id}`),
    create: (resumeId, data) => api.post(`/resumes/${resumeId}/work-experiences`, data),
    update: (resumeId, id, data) => api.put(`/resumes/${resumeId}/work-experiences/${id}`, data),
    delete: (resumeId, id) => api.delete(`/resumes/${resumeId}/work-experiences/${id}`),
};

// Educations
export const educationApi = {
    getAll: (resumeId) => api.get(`/resumes/${resumeId}/educations`),
    get: (resumeId, id) => api.get(`/resumes/${resumeId}/educations/${id}`),
    create: (resumeId, data) => api.post(`/resumes/${resumeId}/educations`, data),
    update: (resumeId, id, data) => api.put(`/resumes/${resumeId}/educations/${id}`, data),
    delete: (resumeId, id) => api.delete(`/resumes/${resumeId}/educations/${id}`),
};

// Skills
export const skillApi = {
    getAll: (resumeId) => api.get(`/resumes/${resumeId}/skills`),
    get: (resumeId, id) => api.get(`/resumes/${resumeId}/skills/${id}`),
    create: (resumeId, data) => api.post(`/resumes/${resumeId}/skills`, data),
    update: (resumeId, id, data) => api.put(`/resumes/${resumeId}/skills/${id}`, data),
    delete: (resumeId, id) => api.delete(`/resumes/${resumeId}/skills/${id}`),
};

// Templates
export const templateApi = {
    getAll: () => api.get('/templates'),
};

// Template Customization
export const customizationApi = {
    get: (resumeId) => api.get(`/resumes/${resumeId}/customization`),
    save: (resumeId, data) => api.post(`/resumes/${resumeId}/customization`, data),
    update: (resumeId, data) => api.put(`/resumes/${resumeId}/customization`, data),
    reset: (resumeId) => api.delete(`/resumes/${resumeId}/customization`),
    applyPreset: (resumeId, preset) => api.post(`/resumes/${resumeId}/customization/preset`, { preset }),
    getPresets: () => api.get('/template-presets'),
};

// Template Builder
export const templateBuilderApi = {
    getAll: () => api.get('/template-builder'),
    getStructure: (id) => api.get(`/template-builder/${id}`),
    create: (data) => api.post('/template-builder', data),
    update: (id, data) => api.put(`/template-builder/${id}`, data),
    delete: (id) => api.delete(`/template-builder/${id}`),
    duplicate: (id) => api.post(`/template-builder/${id}/duplicate`),
};

// AI Enhancement
export const aiApi = {
    enhance: (text) => api.post('/ai/enhance', { text }),
    enhanceBatch: (texts) => api.post('/ai/enhance-batch', { texts }),
    getRateLimit: () => api.get('/ai/rate-limit'),
};

// AI Wizard
export const wizardApi = {
    getStep: (step, data = {}) => api.get('/wizard/step', { params: { step, data } }),
    processInput: (step, value, data) => api.post('/wizard/process', { step, value, data }),
    enhance: (text, type, cvType) => api.post('/wizard/enhance', { text, type, cv_type: cvType }),
    createResume: (data) => api.post('/wizard/create-resume', { data }),
};

export default api;
