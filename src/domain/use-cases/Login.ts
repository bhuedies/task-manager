import { Credentials, AuthSession } from '../entities/Auth';
import { IAuthRepository } from '../repositories/IAuthRepository';

export class Login {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: Credentials): Promise<AuthSession> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required.');
    }

    const session = await this.authRepository.login(credentials);

    return session;
  }
}
