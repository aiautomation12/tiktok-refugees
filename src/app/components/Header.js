"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = ({ onOpenMyProfile, isModalOpen }) => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    setIsDropdownOpen(false);
  };

  const handleProfile = () => {
    if (session) {
      onOpenMyProfile();
    } else {
      window.location.href = "/auth/signin";
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo-02.png" 
              alt="TikTok Refugees" 
              width={300} 
              height={50} 
              priority 
              quality={100}
              className="max-w-[200px] md:max-w-none" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleProfile}
              className="px-6 py-2 text-white bg-[#17616f] rounded-md hover:bg-[#124c57] transition duration-200"
            >
              Profile
            </button>

            {/* Auth Button or User Profile */}
            <div className="relative">
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 hover:bg-gray-50 rounded-full p-1 transition duration-200"
                  >
                    {session.user.image && !imageError ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#17616f] text-white flex items-center justify-center">
                        {session.user.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="text-gray-700 font-medium text-xl">
                      {session.user.name}
                    </span>
                  </button>

                  {/* Desktop Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#17616f] hover:bg-[#124c57] transition duration-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleProfile}
                className="px-6 py-2 text-white bg-[#17616f] rounded-md hover:bg-[#124c57] transition duration-200"
              >
                Profile
              </button>

              {session ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 px-2">
                    {session.user.image && !imageError ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#17616f] text-white flex items-center justify-center">
                        {session.user.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="text-gray-700 font-medium text-xl">
                      {session.user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#17616f] hover:bg-[#124c57] transition duration-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;