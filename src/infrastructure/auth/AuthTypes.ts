import { AuthSession } from '@/domain/entities/Auth';

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  userId: string | null;
}

export interface AuthContextType extends AuthState {
  login: (authData: AuthSession) => void;
  logout: () => void;
}

export type AppAuthSession = AuthSession;
