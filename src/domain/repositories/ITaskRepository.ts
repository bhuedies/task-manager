import { Task } from '../entities/Task';

export interface ITaskRepository {
  create(task: Task): Promise<Task | null>;
  update(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(byProjectId?: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
}
