import { Project } from '../entities/Project';
import { IProjectRepository } from '../repositories/IProjectRepository';

export class UpdateProject {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(updateProjectData: Project): Promise<void> {
    if (!updateProjectData.name) {
      throw new Error('Nama proyek wajib diisi.');
    }
    await this.projectRepository.update(updateProjectData);
  }
}
