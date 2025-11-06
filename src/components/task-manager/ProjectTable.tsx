'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/domain/entities/Project'; // Sesuaikan lokasi
import ProjectModal from './ProjectModal';
import { ListProjects } from '@/domain/use-cases/ListProjects';
import { projectRepositoryInstance } from '@/data/repositories/ProjectRepository';
import { DeleteProject } from '@/domain/use-cases/DeleteProject';

interface ProjectTable {
  IsTask: (proj: Project) => void;
}

export default function ProjectTable({ IsTask }: ProjectTable) {
  const [projects, setProjects] = useState<Project[] | null>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    refreshProjects();
  }, []);

  const refreshProjects = async () => {
    setIsRefreshing(true);
    try {
      const listProjects = new ListProjects(
        projectRepositoryInstance
      );
      const updatedProjects = await listProjects.execute();
      setProjects(updatedProjects);
      setIsCreated(true);
    } catch (error) {
      console.error('Failed to refresh project data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleUpdate = async (proj: Project) => {
    setIsModalOpen(true);
    setIsCreated(false);
    setProject(proj);
  };

  const handleDelete = async (id: string) => {
    const deleteProject = new DeleteProject(
      projectRepositoryInstance
    );
    await deleteProject.execute(id);
    refreshProjects();
  };

  const handleAddTask = (proj: Project) => {
    IsTask(proj);
  };

  const handleProjectCreated = () => {
    setIsModalOpen(false);
    refreshProjects();
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Project Data
          </h1>
          <div className="flex justify-start mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isRefreshing} // Menonaktifkan jika sedang refresh
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-md disabled:bg-indigo-400"
            >
              {isRefreshing ? 'Loading...' : 'New Add Project'}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="shadow-md sm:rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-6/12">
                  Description
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects?.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.id}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    {project.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleUpdate(project)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900 mr-3"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleAddTask(project)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects?.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              Tidak ada data proyek.
            </div>
          )}
        </div>
        <ProjectModal
          isOpen={isModalOpen}
          isCreated={isCreated}
          projectToEdit={project}
          onClose={() => setIsModalOpen(false)}
          onCreated={handleProjectCreated}
        />
      </div>
    </>
  );
}
