import { User } from '../entities/User';

export interface IUserRepository {
  login(email: string, password: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
