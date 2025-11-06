import { Project } from '@/domain/entities/Project';
import { Task } from '@/domain/entities/Task';
import { User } from '@/domain/entities/User';

export const USERS_MOCK_DATA: User[] = [
  {
    id: '1',
    name: 'Eko Agung Winarto',
    email: 'bhuedies@gmail.com',
    password: 'password123',
  },
  {
    id: '2',
    name: 'Nasser Mekhazni',
    email: 'career.pthappyday@gmail.com',
    password: 'password123',
  },
];

export const TASK_MOCK_DATA: Task[] = [];

export const PROJECT_MOCK_DATA: Project[] = [
  {
    id: '1',
    name: 'Project 1',
    description: 'Description 1',
  },
];

export class MockDatabase {
  private users: User[] = USERS_MOCK_DATA;
  private tasks: Task[] = TASK_MOCK_DATA;
  private project: Project[] = PROJECT_MOCK_DATA;

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getUserValidUser(
    email: string,
    password: string
  ): User | undefined {
    return this.users.find(
      (user) => user.email === email && user.password === password
    );
  }

  createTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }

  statusOnTask(id: string): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks[index].completed = true;
    }
  }

  statusOffTask(id: string): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks[index].completed = false;
    }
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  deleteTaskByProjectId(id: string): void {
    this.tasks = this.tasks.filter((task) => task.projectId !== id);
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksByProjectId(id: string): Task[] {
    return this.tasks.filter((task) => task.projectId === id);
  }

  getProjects(): Project[] {
    return this.project;
  }

  createProject(project: Project): void {
    this.project.push(project);
  }

  updateProject(project: Project): void {
    const index = this.project.findIndex((t) => t.id === project.id);
    if (index !== -1) {
      this.project[index] = project;
    }
  }

  deleteProject(id: string): void {
    this.project = this.project.filter(
      (project) => project.id !== id
    );
  }

  getProjectById(id: string): Project | undefined {
    return this.project.find((project) => project.id === id);
  }
}

export const mockDbInstance = new MockDatabase();
