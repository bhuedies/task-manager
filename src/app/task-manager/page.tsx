import UserInfoBar from '@/components/login/UserForm';
import ProjectPage from '@/components/task-manager/ProjectPage';

export const metadata = {
  title: 'Task Manager',
};

export default function taskManagerPage() {
  return (
    <>
      <ProjectPage />
    </>
  );
}
