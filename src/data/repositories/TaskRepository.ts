import { Task } from '@/domain/entities/Task';
import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';

export class UserApiRepository implements IUserRepository {
  async create(task: Task): Promise<void> {}
  async update(task: Task): Promise<void> {}
  async delete(id: string): Promise<void> {}
  async findAll(): Promise<Task[]> {
    return [];
  }
  async findByEmail(email: string): Promise<User | null> {
    return null;
  }
}
