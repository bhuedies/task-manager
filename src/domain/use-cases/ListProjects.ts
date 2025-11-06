import { Project } from '../entities/Project';
import { IProjectRepository } from '../repositories/IProjectRepository';

export class ListProjects {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(): Promise<Project[] | null> {
    const projects = await this.projectRepository.findAll();
    return projects;
  }
}
