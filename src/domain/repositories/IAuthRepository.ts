import { AuthSession, Credentials } from '../entities/Auth';

export interface IAuthRepository {
  login(credentials: Credentials): Promise<AuthSession | null>;
}
