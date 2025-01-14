"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="w-[320px] px-8 py-6 bg-white rounded-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-[#1f1f1f] mb-6">
          Welcome Back
        </h1>
        <div className="space-y-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="relative w-full h-12 bg-[#4285f4] text-white text-sm rounded-lg hover:bg-[#4285f4]/95 transition-colors duration-200 p-1"
          >
            <div className="absolute left-1 top-1 bottom-1 flex items-center justify-center p-2 bg-white w-10 rounded-l-md">
              <svg className="w-6 h-6" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
            </div>
            <div className="text-xl ml-6">Sign in with Google</div>
          </button>
          
          <div className="text-center text-xs text-gray-600 mt-4">
            By continuing, you agree to our{" "}
            <a href="#" className="text-[#4285f4] hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-[#4285f4] hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}