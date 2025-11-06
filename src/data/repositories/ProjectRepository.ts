import { Project } from '@/domain/entities/Project';
import { IProjectRepository } from '@/domain/repositories/IProjectRepository';
import httpClient from '@/infrastructure/config/httpClient';
import axios from 'axios';

export class ProjectRepository implements IProjectRepository {
  async create(project: Project): Promise<Project | null> {
    try {
      const response = await httpClient.post<Project>(
        '/projects',
        project
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return null;
      }
      throw error;
    }
  }
  async update(project: Project): Promise<void> {
    try {
      await httpClient.put(`/projects`, project);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await httpClient.delete(`/projects/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
      throw error;
    }
  }
  async findAll(): Promise<Project[]> {
    try {
      const response = await httpClient.get<Project[]>('/projects');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
      throw error;
    }
  }
  async findById(id: string): Promise<Project | null> {
    try {
      const response = await httpClient.get<Project>(
        `/projects/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
      throw error;
    }
  }
}

export const projectRepositoryInstance = new ProjectRepository();
