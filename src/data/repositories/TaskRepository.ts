import { Task } from '@/domain/entities/Task';
import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import httpClient from '@/infrastructure/config/httpClient';
import axios from 'axios';

export class UserApiRepository implements IUserRepository {
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
      await httpClient.put(`/tasks/${task.id}`, task);
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
  async findAll(): Promise<Task[]> {
    return [];
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
