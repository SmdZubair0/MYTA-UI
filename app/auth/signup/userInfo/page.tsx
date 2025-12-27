"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, X, Check } from "lucide-react";

export default function SignupDetailsPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const role = searchParams.get("role")

  useEffect(() => {
    if (!role) {
      router.replace("/auth/signup");
    }
  }, [role, router]);

  // Optional: prevent UI flash
  if (!role) {
    return null;
  }

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Mock taken usernames (simulate database check)
  const takenUsernames = ["admin", "user", "test", "demo"];

  // Password validation rules
  const passwordRules = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    minLength: password.length >= 8,
    match: password === confirmPassword && password.length > 0,
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "username":
        if (!value.trim()) {
          newErrors.username = "Username is required";
        } else if (takenUsernames.includes(value.toLowerCase())) {
          newErrors.username = "Username is already taken";
        } else {
          delete newErrors.username;
        }
        break;

      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (
          !passwordRules.lowercase ||
          !passwordRules.uppercase ||
          !passwordRules.number ||
          !passwordRules.special ||
          !passwordRules.minLength
        ) {
          newErrors.password = "Password does not meet requirements";
        } else {
          delete newErrors.password;
        }
        break;

      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (value !== password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case "mobile":
        if (!value.trim()) {
          newErrors.mobile = "Mobile number is required";
        } else if (!/^[0-9]{10,15}$/.test(value.replace(/[\s\-\(\)]/g, ""))) {
          newErrors.mobile = "Please enter a valid mobile number";
        } else {
          delete newErrors.mobile;
        }
        break;

      case "terms":
        if (!termsAccepted) {
          newErrors.terms = "You must accept the terms and conditions";
        } else {
          delete newErrors.terms;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    
    if (field === "username") validateField("username", username);
    if (field === "email") validateField("email", email);
    if (field === "password") validateField("password", password);
    if (field === "confirmPassword") validateField("confirmPassword", confirmPassword);
    if (field === "mobile") validateField("mobile", mobile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
      mobile: true,
      terms: true,
    });

    // Validate all fields
    validateField("username", username);
    validateField("email", email);
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);
    validateField("mobile", mobile);

    const newErrors: Record<string, string> = {};

    if (!username.trim()) newErrors.username = "Username is required";
    else if (takenUsernames.includes(username.toLowerCase()))
      newErrors.username = "Username is already taken";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email address";

    if (!password) newErrors.password = "Password is required";
    else if (
      !passwordRules.lowercase ||
      !passwordRules.uppercase ||
      !passwordRules.number ||
      !passwordRules.special ||
      !passwordRules.minLength
    )
      newErrors.password = "Password does not meet requirements";

    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";

    if (!mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^[0-9]{10,15}$/.test(mobile.replace(/[\s\-\(\)]/g, "")))
      newErrors.mobile = "Please enter a valid mobile number";

    if (!termsAccepted)
      newErrors.terms = "You must accept the terms and conditions";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Signup successful", {
        username,
        email,
        password,
        mobile,
      });
      sessionStorage.setItem("signup-details-complete", "true");
      if (role === "it-professional") {
        router.push("/auth/signup/it-professional");
      } else if (role === "marketing") {
        router.push("/auth/signup/marketing");
      }
      // Proceed with signup
    }
  };

  const onNavigateBack = () => {
    router.push("/auth/signup/");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-purple-600 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">MYTA</h2>

          <button
            onClick={() => router.push("/auth/login")}
            className="flex items-center gap-1 text-white font-semibold underline hover:text-purple-200 transition-colors"
          >
            <X className="w-5 h-5" />
            Exit
          </button>
        </div>
      </header>


      {/* Content */}
      <div className="relative w-full mb-8">
        <button
          onClick={onNavigateBack}
          className="absolute top-8 left-8 flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Go Back Link */}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-10">
          Create your account
        </h1>


        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-2 text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (touched.username) validateField("username", e.target.value);
              }}
              onBlur={() => handleBlur("username")}
              className={`w-full px-4 py-2.5 bg-gray-50 border text-gray-900 rounded-lg focus:outline-none transition-colors ${
                errors.username && touched.username
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-purple-500"
              }`}
              placeholder="Choose a username"
            />
            {errors.username && touched.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) validateField("email", e.target.value);
              }}
              onBlur={() => handleBlur("email")}
              className={`w-full px-4 py-2.5 bg-gray-50 border text-gray-900 rounded-lg focus:outline-none transition-colors ${
                errors.email && touched.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-purple-500"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && touched.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (touched.password) validateField("password", e.target.value);
                }}
                onBlur={() => handleBlur("password")}
                className={`w-full px-4 py-2.5 bg-gray-50 border text-gray-900 rounded-lg focus:outline-none transition-colors pr-12 ${
                  errors.password && touched.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-purple-500"
                }`}
                placeholder="Create a password"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (touched.confirmPassword)
                    validateField("confirmPassword", e.target.value);
                }}
                onBlur={() => handleBlur("confirmPassword")}
                className={`w-full px-4 py-2.5 bg-gray-50 border text-gray-900 rounded-lg focus:outline-none transition-colors pr-12 ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-purple-500"
                }`}
                placeholder="Confirm your password"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          
          {/* Password Requirements */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  passwordRules.lowercase ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {passwordRules.lowercase && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span
                className={`text-sm ${
                  passwordRules.lowercase ? "text-green-700" : "text-gray-600"
                }`}
              >
                One lowercase character
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  passwordRules.uppercase ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {passwordRules.uppercase && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span
                className={`text-sm ${
                  passwordRules.uppercase ? "text-green-700" : "text-gray-600"
                }`}
              >
                One uppercase character
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  passwordRules.number ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {passwordRules.number && <Check className="w-3 h-3 text-white" />}
              </div>
              <span
                className={`text-sm ${
                  passwordRules.number ? "text-green-700" : "text-gray-600"
                }`}
              >
                One number
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  passwordRules.special ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {passwordRules.special && <Check className="w-3 h-3 text-white" />}
              </div>
              <span
                className={`text-sm ${
                  passwordRules.special ? "text-green-700" : "text-gray-600"
                }`}
              >
                One special character
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  passwordRules.minLength ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {passwordRules.minLength && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span
                className={`text-sm ${
                  passwordRules.minLength ? "text-green-700" : "text-gray-600"
                }`}
              >
                8 characters minimum
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  passwordRules.match ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {passwordRules.match && <Check className="w-3 h-3 text-white" />}
              </div>
              <span
                className={`text-sm ${
                  passwordRules.match ? "text-green-700" : "text-gray-600"
                }`}
              >
                Passwords must match
              </span>
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobile" className="block mb-2 text-gray-700">
              Mobile Number
            </label>
            <input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                if (touched.mobile) validateField("mobile", e.target.value);
              }}
              onBlur={() => handleBlur("mobile")}
              className={`w-full px-4 py-2.5 bg-gray-50 border text-gray-900 rounded-lg focus:outline-none transition-colors ${
                errors.mobile && touched.mobile
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-purple-500"
              }`}
              placeholder="Enter your mobile number"
            />
            {errors.mobile && touched.mobile && (
              <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div>
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  setTouched({ ...touched, terms: true });
                }}
                className="mt-1 w-4 h-4 accent-purple-600"
              />
              <label htmlFor="terms" className="text-gray-700">
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsPopup(true)}
                  className="text-purple-600 hover:text-purple-700 underline transition-colors"
                >
                  Terms and Conditions
                </button>
              </label>
            </div>
            {errors.terms && touched.terms && (
              <p className="text-red-600 text-sm mt-1">{errors.terms}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg transition-colors"
          >
            Complete Signup
          </button>
        </form>
      </div>

      {/* Terms and Conditions Popup */}
      {showTermsPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowTermsPopup(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-purple-700">Terms and Conditions</h3>
              <button
                onClick={() => setShowTermsPopup(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-gray-700">
              <p>
                Welcome to MYTA. By creating an account and using our services,
                you agree to be bound by these Terms and Conditions.
              </p>

              <h4>1. Acceptance of Terms</h4>
              <p>
                By accessing and using MYTA's services, you accept and agree to
                be bound by the terms and provision of this agreement.
              </p>

              <h4>2. Use License</h4>
              <p>
                Permission is granted to temporarily access the materials
                (information or software) on MYTA's platform for personal,
                non-commercial transitory viewing only.
              </p>

              <h4>3. User Account</h4>
              <p>
                You are responsible for maintaining the confidentiality of your
                account and password. You agree to accept responsibility for all
                activities that occur under your account.
              </p>

              <h4>4. Privacy Policy</h4>
              <p>
                Your use of MYTA is also governed by our Privacy Policy. Please
                review our Privacy Policy, which also governs the site and
                informs users of our data collection practices.
              </p>

              <h4>5. Modifications</h4>
              <p>
                MYTA may revise these terms of service at any time without
                notice. By using this platform you are agreeing to be bound by
                the then current version of these terms of service.
              </p>

              <h4>6. Contact Information</h4>
              <p>
                If you have any questions about these Terms and Conditions,
                please contact us at support@myta.com.
              </p>
            </div>
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowTermsPopup(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
