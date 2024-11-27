import React from 'react';
import { Shield } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">VRV Security</h1>
              <p className="text-sm text-gray-500">Role-Based Access Control System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Admin Dashboard</span>
          </div>
        </div>
      </div>
    </header>
  );
};