import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/token/', { email, password });
    return response.data;
  },

  changePassword: async (oldPassword, newPassword) => {
    const response = await api.post('/auth/change-password/', {
      old_password: oldPassword,
      new_password: newPassword
    });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me/');
    return response.data;
  }
};
