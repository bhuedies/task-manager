'use client';
import { Project } from '@/domain/entities/Project';
import ProjectTable from './ProjectTable';
import { useState } from 'react';
import TaskTable from './TaskTable';

export default function ProjectsPage() {
  const [isProject, setIsProject] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  const handleProjectClick = (proj: Project) => {
    setIsProject(false);
    setProject(proj);
  };

  const handleTaskClick = () => {
    setIsProject(true);
    setProject(null);
  };

  return (
    <div className="p-8">
      <>
        {isProject ? (
          <ProjectTable IsTask={handleProjectClick} />
        ) : (
          <TaskTable
            dataProject={project}
            previousPage={handleTaskClick}
          />
        )}
      </>
    </div>
  );
}
