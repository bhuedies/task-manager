'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { AuthContextType, AuthState } from './AuthTypes';
import { AuthSession } from '@/domain/entities/Auth';

const AUTH_KEY = 'auth_data';

const initialAuthState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  userId: null,
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] =
    useState<AuthState>(initialAuthState);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(AUTH_KEY);
      if (storedData) {
        const authData: AuthSession = JSON.parse(storedData);

        if (Date.now() < authData.expiresAt) {
          setAuthState({
            isAuthenticated: true,
            accessToken: authData.accessToken,
            userId: authData.userId,
          });
        } else {
          localStorage.removeItem(AUTH_KEY);
        }
      }
    } catch (error) {
      console.error(
        'Failed to load auth data from local storage',
        error
      );
    }
  }, []);

  const login = (authData: AuthSession) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));

    setAuthState({
      isAuthenticated: true,
      accessToken: authData.accessToken,
      userId: authData.userId,
    });
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthState(initialAuthState);
  };

  const contextValue = useMemo(
    () => ({
      ...authState,
      login,
      logout,
    }),
    [authState]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Export useAuth hook (tetap sama)
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
