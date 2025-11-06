import { Task } from '@/domain/entities/Task';
import { ITaskRepository } from '@/domain/repositories/ITaskRepository';
import httpClient from '@/infrastructure/config/httpClient';
import axios from 'axios';

export class TaskRepository implements ITaskRepository {
  async updateStatus(id: string, status: boolean): Promise<void> {
    try {
      await httpClient.put(`/tasks`, { id: id, status: status });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
      throw error;
    }
  }
  async create(task: Task): Promise<Task | null> {
    try {
      const response = await httpClient.post<Task>('/tasks', task);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return null;
      }
      throw error;
    }
  }
  async update(task: Task): Promise<void> {
    try {
      await httpClient.put(`/tasks`, task);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await httpClient.delete(`/tasks/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
      throw error;
    }
  }

  async findAll(byProjectId: string): Promise<Task[]> {
    try {
      const response = await httpClient.get<Task[]>(
        `/tasks/projects/${byProjectId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
      throw error;
    }
  }
  async findById(id: string): Promise<Task | null> {
    try {
      const response = await httpClient.get<Task>(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return null;
      }
      throw error;
    }
  }
}

export const taskRepositoryInstance = new TaskRepository();
