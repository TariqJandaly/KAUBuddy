import { createFileRoute } from '@tanstack/react-router'
import { FaGithub } from "react-icons/fa";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen w-full bg-black bg-[linear-gradient(to_right,#80808012_2px,transparent_2px),linear-gradient(to_bottom,#80808012_2px,transparent_2px)] bg-[size:24px_24px]">
      <div className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 py-12">

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
          Star on GitHub
        </a>

        {/* Footer */}
        <p className="mt-12 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} KAUBuddy. All rights reserved.
        </p>
      </div>
    </div>
  )
}
