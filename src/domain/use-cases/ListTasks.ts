import { Task } from '../entities/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class ListTasks {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(byProjectId: string): Promise<Task[] | null> {
    const projects = await this.taskRepository.findAll(byProjectId);
    return projects;
  }
}
