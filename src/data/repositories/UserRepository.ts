import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import httpClient from '../../infrastructure/config/httpClient';
import axios from 'axios';

export class UserApiRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    try {
      const response = await httpClient.get<User>(`/users/${email}`);
      return response.data;
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401
      ) {
        return null;
      }
      throw error;
    }
  }
}
