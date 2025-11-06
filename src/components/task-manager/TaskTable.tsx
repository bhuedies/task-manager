'use client';

import { taskRepositoryInstance } from '@/data/repositories/TaskRepository';
import { Project } from '@/domain/entities/Project';
import { Task } from '@/domain/entities/Task';
import { DeleteTask } from '@/domain/use-cases/DeleteTask';
import { ListTasks } from '@/domain/use-cases/ListTasks';
import { useEffect, useMemo, useState } from 'react';
import TaskModal from './TaskModal';
import ToggleSwitch from '../ui/ToggleSwitch';
import { UpdateTaskStatus } from '@/domain/use-cases/UpdateTaskStatus';

interface TaskModalProps {
  dataProject: Project | null;
  previousPage: () => void;
}

type SortDirection = 'asc' | 'desc' | null;

export default function TaskTable({
  dataProject,
  previousPage,
}: TaskModalProps) {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>('asc');

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    setIsRefreshing(true);
    try {
      const listTask = new ListTasks(taskRepositoryInstance);
      const updatedTask = await listTask.execute(
        dataProject?.id || ''
      );
      setTasks(updatedTask);
      setIsCreated(true);
    } catch (error) {
      console.error('Failed to refresh task data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleUpdate = async (tsk: Task) => {
    setIsModalOpen(true);
    setIsCreated(false);
    setTask(tsk);
  };

  const handleDelete = async (id: string) => {
    const deleteTask = new DeleteTask(taskRepositoryInstance);
    await deleteTask.execute(id);
    refreshTasks();
  };

  const handleTaskCreated = () => {
    setIsModalOpen(false);
    refreshTasks();
  };

  const handlePreviousPage = () => {
    previousPage();
  };

  const handleSortByStatus = () => {
    setSortDirection((prevDirection) => {
      if (prevDirection === 'asc') {
        return 'desc';
      }
      if (prevDirection === 'desc') {
        return 'asc';
      }
      return 'asc';
    });
  };

  const sortedTasks = useMemo(() => {
    if (!tasks || !Array.isArray(tasks)) {
      return [];
    }
    if (!sortDirection) return tasks;

    const sorted = [...tasks].sort((a, b) => {
      const aStatus = a.completed ? 1 : 0;
      const bStatus = b.completed ? 1 : 0;

      if (sortDirection === 'asc') {
        return aStatus - bStatus;
      } else {
        return bStatus - aStatus;
      }
    });

    return sorted;
  }, [tasks, sortDirection]);

  const handleToggle = async (itemId: string, isOn: boolean) => {
    try {
      const updateStatus = new UpdateTaskStatus(
        taskRepositoryInstance
      );
      await updateStatus.execute(itemId, isOn);

      setTasks((prevTasks) => {
        if (!prevTasks) return null;

        return prevTasks.map((task) => {
          if (task.id === itemId) {
            return { ...task, completed: isOn };
          }
          return task;
        });
      });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex justify-start mb-4">
            <button
              onClick={() => handlePreviousPage()}
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 shadow-md disabled:bg-green-400"
            >
              Back
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Task Data {dataProject?.name}
          </h1>
          <div className="flex justify-start mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isRefreshing} // Menonaktifkan jika sedang refresh
              className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-md disabled:bg-indigo-400"
            >
              {isRefreshing ? 'Loading...' : 'New Add Task'}
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
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-6/12">
                  Description
                </th>
                <th
                  onClick={handleSortByStatus}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-6/12 
               cursor-pointer hover:bg-gray-100 transition duration-150"
                >
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTasks?.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.id}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    {task.description}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    <ToggleSwitch
                      initialState={false}
                      itemId={task.id}
                      onToggle={handleToggle}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleUpdate(task)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:text-red-900 mr-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tasks?.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No data Task
            </div>
          )}
        </div>
        <TaskModal
          isOpen={isModalOpen}
          isCreated={isCreated}
          projectId={dataProject?.id}
          taskToEdit={task}
          onClose={() => setIsModalOpen(false)}
          onCreated={handleTaskCreated}
        />
      </div>
    </>
  );
}
