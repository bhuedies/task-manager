'use client';

import { userRepositoryInstance } from '@/data/repositories/UserRepository';
import { AuthSession } from '@/domain/entities/Auth';
import { User } from '@/domain/entities/User';
import { GetUser } from '@/domain/use-cases/GetUser';

import { useAuth } from '@/infrastructure/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserInfoBar() {
  const { logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedData = localStorage.getItem('auth_data');
        if (!storedData) {
          return;
        }
        const authData: AuthSession = JSON.parse(storedData);
        const id = authData.userId;
        const getUser = new GetUser(userRepositoryInstance);
        const _user = await getUser.execute(id);
        setUser(_user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // handleLogout();
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="p-3 border-t border-b mb-6">
      <p className="font-semibold text-gray-800">{user?.name}</p>
      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
      <button
        onClick={handleLogout}
        className="mt-2 text-sm text-red-500 hover:text-red-700 underline"
      >
        Logout
      </button>
    </div>
  );
}
