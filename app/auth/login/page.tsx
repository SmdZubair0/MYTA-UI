"use client";

import { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const onNavigateToSignup = () => {
    router.push("/auth/signup");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !password) {
        setError("Please enter email/username and password");
        return;
    }

    if (!email) {
        setError("Please enter email/username");
        return;
    }

    if (!password) {
        setError("Please enter password");
        return;
    }

    setError("");
    console.log("Login clicked", { email, password });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Purple Wave Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#8b5cf6"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-12">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Welcome Section */}
          <div className="space-y-8">
            <h1 className="text-5xl text-purple-600">Welcome to MYTA</h1>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1.5">
                  <Check className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-gray-700">
                  Secure and reliable platform for all your needs
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5">
                  <Check className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-gray-700">
                  Access your account from anywhere, anytime
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5">
                  <Check className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-gray-700">
                  Seamless experience across all devices
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5">
                  <Check className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-gray-700">
                  24/7 customer support to assist you
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-3xl text-purple-600 mb-6 text-center">MYTA</h2>
            
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username/Email Input */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Username/Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2     focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your username or email"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2focus:ring-purple-500 focus:border-transparent pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Login
              </button>

              {/* Sign Up Link */}
              <div className="text-center text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onNavigateToSignup}
                  className="text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Create one
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}