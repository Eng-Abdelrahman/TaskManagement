import axios from 'axios';
import type { ServiceResponse } from '../models/service-response';
import type { Task } from '../models/task-model';

const apiClient = axios.create({
  baseURL: 'http://localhost:5149/api',
});


export const taskService = {
 fetchTasks: async () => {
      const response = await apiClient.get<ServiceResponse<Task[]>>('/Task');
      return response.data.data;   
  },

  createTask: async (task: any) => {
      const response = await apiClient.post<ServiceResponse<Task>>('/Task/CreateTask', task);
      return response.data; 
  },

  updateTask: async (task: any) => {
      const response = await apiClient.put<ServiceResponse<Task>>('/Task', task);
      return response.data;
  },

  deleteTask: async (id: number) => {
      const response = await apiClient.delete<ServiceResponse<boolean>>(`/Task/${id}`);
      return response.data;   
  },

  markTaskComplete: async (id: number) => {  
      const response = await apiClient.patch<ServiceResponse<Task>>(`/Task/${id}/complete`);     
      return response.data;
  },
};
