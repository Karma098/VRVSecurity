import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { UserList } from './components/UserList';
import { RoleList } from './components/RoleList';
import { useAppDispatch } from './hooks/redux';
import { fetchUsers } from './store/slices/userSlice';
import { fetchRoles } from './store/slices/roleSlice';
import { fetchPermissions } from './store/slices/permissionSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
    dispatch(fetchPermissions());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <UserList />
          <RoleList />
        </div>
      </main>
    </div>
  );
}

export default App;