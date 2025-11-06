import { Task } from '../entities/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class UpdateTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(updateTaskData: Task): Promise<void> {
    if (!updateTaskData.title) {
      throw new Error('Title Task is required.');
    }
    await this.taskRepository.update(updateTaskData);
  }
}
