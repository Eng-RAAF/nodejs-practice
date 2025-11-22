const API_BASE_URL = '/api';

// Generic API functions
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // Get response text first to check if it's empty
    const text = await response.text();
    
    if (!response.ok) {
      // Try to parse as JSON, fallback to status text
      let errorMessage = 'Something went wrong';
      try {
        if (text) {
          const error = JSON.parse(text);
          errorMessage = error.error || error.message || errorMessage;
        } else {
          errorMessage = response.statusText || errorMessage;
        }
      } catch (e) {
        errorMessage = text || response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Parse JSON only if there's content
    if (!text || text.trim() === '') {
      return null; // Empty response
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    // Re-throw with more context if it's a network error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Could not connect to server. Make sure the backend is running.');
    }
    throw error;
  }
};

// Students API
export const studentsAPI = {
  getAll: () => apiRequest('/students'),
  getById: (id) => apiRequest(`/students/${id}`),
  create: (data) => apiRequest('/students', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/students/${id}`, { method: 'DELETE' }),
};

// Classes API
export const classesAPI = {
  getAll: () => apiRequest('/classes'),
  getById: (id) => apiRequest(`/classes/${id}`),
  create: (data) => apiRequest('/classes', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/classes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/classes/${id}`, { method: 'DELETE' }),
};

// Teachers API
export const teachersAPI = {
  getAll: () => apiRequest('/teachers'),
  getById: (id) => apiRequest(`/teachers/${id}`),
  create: (data) => apiRequest('/teachers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/teachers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/teachers/${id}`, { method: 'DELETE' }),
};

// Enrollments API
export const enrollmentsAPI = {
  getAll: () => apiRequest('/enrollments'),
  getById: (id) => apiRequest(`/enrollments/${id}`),
  getByStudent: (studentId) => apiRequest(`/enrollments/student/${studentId}`),
  getByClass: (classId) => apiRequest(`/enrollments/class/${classId}`),
  create: (data) => apiRequest('/enrollments', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/enrollments/${id}`, { method: 'DELETE' }),
  unenroll: (studentId, classId) =>
    apiRequest(`/enrollments/student/${studentId}/class/${classId}`, { method: 'DELETE' }),
};

