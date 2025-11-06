import { ITaskRepository } from '../repositories/ITaskRepository';

export class DeleteTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
