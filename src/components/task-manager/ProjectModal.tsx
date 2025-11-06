import { projectRepositoryInstance } from '@/data/repositories/ProjectRepository';
import { Project } from '@/domain/entities/Project';
import { CreateProject } from '@/domain/use-cases/CreateProject';
import { UpdateProject } from '@/domain/use-cases/UpdateProject';
import React, { useEffect, useState } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  isCreated: boolean;
  projectToEdit?: Project | null;
  onClose: () => void;
  onCreated: () => void;
}

export default function ProjectModal({
  isOpen,
  isCreated,
  projectToEdit,
  onClose,
  onCreated,
}: ProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectToEdit) {
      setName(projectToEdit.name);
      setDescription(projectToEdit.description);
    } else {
      setName('');
      setDescription('');
    }
    setError(null);
  }, [projectToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const newProjectData = { name, description };

    try {
      if (isCreated) {
        const createProject = new CreateProject(
          projectRepositoryInstance
        );
        await createProject.execute(newProjectData);
      } else {
        const updateData = { ...projectToEdit };
        updateData.name = name;
        updateData.description = description;
        const updateProject = new UpdateProject(
          projectRepositoryInstance
        );
        await updateProject.execute(updateData);
      }

      onCreated();

      // Reset dan Tutup
      setName('');
      setDescription('');
      onClose();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan proyek.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Add New Project
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-700"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-700"
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              {isLoading ? 'Please Wait...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
