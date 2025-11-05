import { AuthSession, Credentials } from '@/domain/entities/Auth';
import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import httpClient from '@/infrastructure/config/httpClient';
import axios from 'axios';

export class AuthRepository implements IAuthRepository {
  async login(credentials: Credentials): Promise<AuthSession | null> {
    try {
      const response = await httpClient.post<AuthSession>(
        '/auth/login',
        credentials
      );
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

export const authRepositoryInstance = new AuthRepository();
