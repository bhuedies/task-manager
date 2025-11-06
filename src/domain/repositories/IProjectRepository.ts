import { Project } from '../entities/Project';

export interface IProjectRepository {
  create(project: Project): Promise<Project | null>;
  update(project: Project): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
}
