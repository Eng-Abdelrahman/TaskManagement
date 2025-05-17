import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5149/api',
});

export const TaskService = {
  async getTasks() {
    const response = await apiClient.get('/task');
    return response.data;
  },

  async createTask(task) {
    const response = await apiClient.post('/task', task);
    return response.data;
  },

  async updateTask(id, task) {
    const response = await apiClient.put(`/task/${id}`, task);
    return response.data;
  },

  async markTaskComplete(id) {
    const response = await apiClient.patch(`/task/${id}/complete`);
    return response.data;
  },
};

