// API configuration
const API_URL = 'http://localhost:5000/api/v1';

// getting token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// making API calls with proper headers
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    ...options
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// auth API calls
export const authAPI = {
  // calling the register API here
  register: async (name, email, password) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: { name, email, password }
    });
  },

  // logging in
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
  },

  // getting user profile
  getProfile: async () => {
    return apiCall('/auth/profile');
  }
};

// task API calls
export const taskAPI = {
  // getting all tasks
  getAll: async () => {
    return apiCall('/tasks');
  },

  // getting single task
  getById: async (id) => {
    return apiCall(`/tasks/${id}`);
  },

  // creating new task
  create: async (title, description) => {
    return apiCall('/tasks', {
      method: 'POST',
      body: { title, description }
    });
  },

  // updating task
  update: async (id, title, description, completed) => {
    return apiCall(`/tasks/${id}`, {
      method: 'PUT',
      body: { title, description, completed }
    });
  },

  // deleting task
  delete: async (id) => {
    return apiCall(`/tasks/${id}`, {
      method: 'DELETE'
    });
  }
};

