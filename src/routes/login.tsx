import { createFileRoute } from '@tanstack/react-router';
import Logo from '@/components/Global/Logo';
import { LoginForm } from '@/components/Pages/login-form';
import { Rights } from '@/components/Global/Rights';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4">

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-3 z-50">
        <Logo />
      </header>

      {/* Login Card */}
      <div className="flex w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>

      <Rights />
    </div>
  );
}
