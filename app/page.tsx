"use client"

import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const runtime = "edge"

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative px-4">

      {/* Welcome Text */}
      <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text mb-6">
        Welcome to KAUBuddy
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-400 text-center mb-12">
        <span>An app made by students, for students.</span><br />
        <span>We are still developing it, thank you for your patience ❣️</span>
      </p>

      {/* GitHub Button */}
      <Link
        href="https://github.com/TariqJandaly/KAUBuddy"
        target="_blank"
        className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
      >
        <FaGithub size={20} />
        View on GitHub
      </Link>

      {/* Footer */}
      <p className="absolute text-sm bottom-6 text-gray-500">
        &copy; {new Date().getFullYear()} KAUBuddy. All rights reserved.
      </p>
    </div>
  );
}
