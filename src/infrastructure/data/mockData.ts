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

export class MockDatabase {
  private users: User[] = USERS_MOCK_DATA;
  private tasks: Task[] = TASK_MOCK_DATA;

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    console.log(id);
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

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getTaskById(id: string): Task | undefined {
    const data1 = this.tasks;
    const data = this.tasks.find((task) => task.id === id);
    return this.tasks.find((task) => task.id === id);
  }

  getTasks(): Task[] {
    return this.tasks;
  }
}

export const mockDbInstance = new MockDatabase();
