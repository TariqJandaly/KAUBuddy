import Logo from '@/components/Global/Logo';
import { Rights } from '@/components/Global/Rights';
import UserButton from '@/components/Global/UserButton';
import { createFileRoute } from '@tanstack/react-router'
import { FaGithub } from "react-icons/fa";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 py-12">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-3 z-50">
        <Logo />
        <UserButton />
      </div>

      {/* Welcome Text */}
      <h1 className="text-5xl leading-loose font-extrabold text-center bg-gradient-to-r from-green-400 via-blue-500 to-teal-600 text-transparent bg-clip-text mb-6 animated-gradient">
        Welcome to KAUBuddy
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-400 text-center mb-12">
        <span>An app made by students, for students.</span><br />
        <span>We are still developing it, thank you for your patience ❣️</span>
      </p>

      {/* GitHub Button */}
      <a
        href="https://github.com/TariqJandaly/KAUBuddy"
        target="_blank"
        className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
      >
        <FaGithub size={20} />
        ⭐ Star on GitHub
      </a>

      <Rights />
    </div>
  )
}
