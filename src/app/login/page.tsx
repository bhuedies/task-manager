import LoginForm from '@/components/login/LoginForm';

export const metadata = {
  title: 'Login Page',
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <LoginForm />
    </div>
  );
}
