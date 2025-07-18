import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-600">BillForge</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/dashboard" className="text-gray-700  font-medium">Home</a>
            <a href="/pricing" className="text-gray-700  font-medium">Pricing</a>
            <a href="#" className="text-gray-700  font-medium">Contact</a>
            <a href="/profile" className="block text-gray-700 ">Profile</a>
            <a href="/billing-history" className="block text-gray-700 ">Billing History</a>
            <a href="/usage" className="block text-gray-700 ">Billing History</a>
          </div>
          <div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-md">
          <a href="#" className="block text-gray-700 ">Home</a>
          <a href="/pricing" className="text-gray-700  font-medium">Pricing</a>
          <a href="#" className="block text-gray-700 ">Contact</a>
          <a href="/Profile" className="block text-gray-700 ">Profile</a>
          <a href="/billing-history" className="block text-gray-700 ">Billing History</a>

        </div>
      )}
    </nav>
  );
}
