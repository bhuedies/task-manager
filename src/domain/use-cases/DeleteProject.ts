import { IProjectRepository } from '../repositories/IProjectRepository';

export class DeleteProject {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
