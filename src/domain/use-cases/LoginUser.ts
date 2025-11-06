import { AuthSession, Credentials } from '../entities/Auth';
import { IAuthRepository } from '../repositories/IAuthRepository';

export class LoginUser {
  constructor(private authRepository: IAuthRepository) {}

  async execute(
    credentials: Credentials
  ): Promise<AuthSession | null> {
    if (!credentials.email || credentials.email.trim() === '') {
      throw new Error('Email cannot empty');
    }
    if (!credentials.password || credentials.password.trim() === '') {
      throw new Error('Password cannot empty');
    }

    try {
      const session = await this.authRepository.login(credentials);
      return session;
    } catch (error) {
      throw error;
    }
  }
}
