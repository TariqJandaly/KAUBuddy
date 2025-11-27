import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full h-full flex items-center justify-center'>Working on it...</div>
}
