import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class GetUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
