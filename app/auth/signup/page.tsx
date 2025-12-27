"use client";

import { ArrowLeft, Briefcase, Clock } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function SelectionPage() {

  const router = useRouter();

  const onNavigateBack = () => {
    router.push("/auth/login");
  };

  const handleITProfessionalClick = () => {
    router.push("/auth/signup/userInfo?role=it-professional")
  };

  const handleComingSoonClick = () => {
    console.log('Coming soon option clicked');
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Blurred Background with Purple Wave */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 backdrop-blur-sm bg-white/50"></div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 320"
            className="w-full blur-sm"
            preserveAspectRatio="none"
          >
            <path
              fill="#8b5cf6"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 py-12">
        {/* Back Button */}
        <button
          onClick={onNavigateBack}
          className="absolute top-8 left-8 flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Login</span>
        </button>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-purple-600 mb-4">Join MYTA</h1>
          <p className="text-gray-600">Choose your account type to get started</p>
        </div>

        {/* Cards Container */}
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
          {/* IT Professional Card */}
          <button
            onClick={handleITProfessionalClick}
            className="group bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                <Briefcase className="w-10 h-10 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h2 className="text-2xl text-purple-600 group-hover:text-purple-700 transition-colors">
                Sign up as IT Professional
              </h2>
              <p className="text-gray-600">
                Join our community of talented IT professionals and access exclusive opportunities
              </p>
              <div className="pt-4">
                <span className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg group-hover:bg-purple-700 transition-colors">
                  Get Started
                </span>
              </div>
            </div>
          </button>

          {/* Coming Soon Card */}
          <button
            onClick={handleComingSoonClick}
            className="group bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-not-allowed opacity-75"
            disabled
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                <Clock className="w-10 h-10 text-gray-400 transition-colors duration-300" />
              </div>
              <h2 className="text-2xl text-gray-500 transition-colors">
                Coming Soon
              </h2>
              <p className="text-gray-500">
                More account types will be available soon. Stay tuned for updates!
              </p>
              <div className="pt-4">
                <span className="inline-block px-6 py-2 bg-gray-300 text-gray-600 rounded-lg">
                  Not Available
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
