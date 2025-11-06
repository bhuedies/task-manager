import { Task } from '../entities/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class CreateTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(
    newTaskData: {
      title: string;
      description: string;
    },
    projectId?: string
  ): Promise<Task | null> {
    console.log('🚀 ~ CreateTask ~ execute ~ projectId:', projectId);
    if (!newTaskData.title) {
      throw new Error('Task title is required.');
    }

    const mockCreatedTask: Task = {
      id: `t${Date.now()}`,
      projectId: projectId,
      completed: false,
      ...newTaskData,
    };

    const createdTask = await this.taskRepository.create(
      mockCreatedTask
    );

    return createdTask;
  }
}
