"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen bg-gradient-to-tr from-purple-100 to-purple-200 font-sans overflow-hidden">
      {/* Floating paws */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="animate-float text-4xl absolute top-10 left-10 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute top-40 left-2/3 opacity-70">🐾</div>
        <div className="animate-float text-5xl absolute bottom-20 right-20 opacity-70">🐾</div>
        <div className="animate-float text-2xl absolute bottom-10 left-1/4 opacity-70">🐾</div>
        <div className="animate-float text-4xl absolute top-1/2 right-1/3 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute top-1/3 left-1/6 opacity-70">🐾</div>
        <div className="animate-float text-2xl absolute top-20 right-1/5 opacity-70">🐾</div>
        <div className="animate-float text-4xl absolute bottom-1/3 left-2/3 opacity-70">🐾</div>
        <div className="animate-float text-5xl absolute bottom-10 right-1/4 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute top-5 right-5 opacity-70">🐾</div>
        <div className="animate-float text-4xl absolute top-1/4 left-1/3 opacity-70">🐾</div>
        <div className="animate-float text-2xl absolute top-3/4 right-1/6 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute top-16 left-1/2 opacity-70">🐾</div>
        <div className="animate-float text-5xl absolute bottom-5 left-5 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute bottom-1/4 right-2/3 opacity-70">🐾</div>
        <div className="animate-float text-4xl absolute top-2/3 left-1/5 opacity-70">🐾</div>
        <div className="animate-float text-2xl absolute bottom-1/5 right-1/2 opacity-70">🐾</div>
        <div className="animate-float text-5xl absolute top-14 right-1/4 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute bottom-1/6 left-1/2 opacity-70">🐾</div>
        <div className="animate-float text-4xl absolute top-1/5 left-2 opacity-70">🐾</div>
        <div className="animate-float text-3xl absolute top-2/4 left-5 opacity-70">🐾</div>
        <div className="animate-float text-5xl absolute bottom-1/3 left-3 opacity-70">🐾</div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 p-4 bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200">
  <div className="max-w-6xl mx-auto flex items-center justify-center relative">
    {/* Centered Title */}
    <h1 className="text-2xl sm:text-3xl font-semibold text-red-600 tracking-wide text-center">
      PET EMOTION DETECTOR
    </h1>
  </div>
</nav>


      {/* Hero Section */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-center px-6 py-16">
        {/* Left - Illustration */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <Image
            src="/hh.avif"
            alt="Hero illustration"
            width={500}
            height={500}
            className="rounded-md"
          />
        </div>

        {/* Right - Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 leading-tight">
            UNDERSTAND YOUR<br /> PET BETTER!
          </h1>
          <p className="mt-6 text-gray-700">
            Understanding your pet’s emotions has never been easier! Our AI-powered Pet Emotion Detector helps you decode your pet’s feelings—whether they’re happy, sad, angry, or relaxed—just by analyzing their image.
          </p>
          <p className="mt-4 text-gray-700">
            Strengthen your bond, respond better to their needs, and become the best companion your furry friend deserves. Because pets can’t speak, but their expressions do.
          </p>
          <button
            className="mt-6 px-6 py-3 bg-purple-700 hover:bg-purple-900 rounded-full text-gray-100 font-semibold shadow-lg"
            onClick={() => router.push("/upload")}
          >
            Try it now!
          </button>
        </div>
      </section>
    </main>
  );
}
