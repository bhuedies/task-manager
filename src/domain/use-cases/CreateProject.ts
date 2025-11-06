import toast from 'react-hot-toast';
import { Project } from '../entities/Project';
import { IProjectRepository } from '../repositories/IProjectRepository';

export class CreateProject {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(newProjectData: {
    name: string;
    description: string;
  }): Promise<Project | null> {
    if (!newProjectData.name) {
      throw new Error('Project Name is required.');
    }

    const mockCreatedProject: Project = {
      id: `p${Date.now()}`,
      ...newProjectData,
    };

    const createdProject = await this.projectRepository.create(
      mockCreatedProject
    );
    toast.success('Project Created!');

    return createdProject;
  }
}
