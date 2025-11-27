import Logo from '@/components/Global/Logo';
import UserButton from '@/components/Global/UserButton';
import { Spinner } from '@/components/ui/spinner';
import { useSession } from '@/lib/authClient';
import { useNavigate } from '@tanstack/react-router';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  component: RouteComponent
})

function RouteComponent() {

  const { data: session, isPending } = useSession();
  const navigate = useNavigate()


  if (isPending || !session) {
    if (!isPending && !session) navigate({ to: "/login" })
    return <div className='w-screen h-screen flex justify-center items-center'>
      <Spinner color='LightGreen' className='size-10' />
    </div>
  }

  return <>
    <div className='h-[90vh]'>
      <div className='flex items-center justify-between p-5'>
        <Logo />
        <UserButton />
      </div>
      <Outlet />
    </div>
  </>
}
