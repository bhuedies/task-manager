import { ITaskRepository } from '../repositories/ITaskRepository';

export class UpdateTaskStatus {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string, status: boolean): Promise<void> {
    await this.taskRepository.updateStatus(id, status);
  }
}
