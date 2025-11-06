'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Untuk navigasi setelah login
import { LoginUser } from '@/domain/use-cases/LoginUser';
import { authRepositoryInstance } from '@/data/repositories/AuthRepository';
import { useAuth } from '@/infrastructure/auth/AuthProvider';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const loginUser = new LoginUser(authRepositoryInstance);
      const session = await loginUser.execute({ email, password });
      login(session);
      router.push('/task-manager');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.message || 'Login failed. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Please Login!
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            placeholder="career.pthappyday@gmail.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            placeholder="123456"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>

      {/* error */}
      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
