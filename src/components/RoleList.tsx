import React, { useState } from 'react';
import { Role, Permission } from '../types';
import { useStore } from '../hooks/useStore';
import { Edit2, Trash2, Plus, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const RoleList: React.FC = () => {
  const { roles, permissions, addRole, updateRole, deleteRole } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<Omit<Role, 'id'>>({
    name: '',
    description: '',
    permissions: [],
  });

  const handleAdd = async () => {
    if (!newRole.name || !newRole.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    await addRole(newRole);
    setIsAdding(false);
    setNewRole({ name: '', description: '', permissions: [] });
    toast.success('Role added successfully');
  };

  const handleUpdate = async (id: string, role: Partial<Role>) => {
    await updateRole(id, role);
    setEditingId(null);
    toast.success('Role updated successfully');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      await deleteRole(id);
      toast.success('Role deleted successfully');
    }
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Roles</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Role
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isAdding && (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    placeholder="Role Name"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    placeholder="Description"
                    value={newRole.description}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-4">
                    {Object.entries(groupedPermissions).map(([category, perms]) => (
                      <div key={category}>
                        <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
                        <div className="space-y-2">
                          {perms.map((permission) => (
                            <label key={permission.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={newRole.permissions.includes(permission.id)}
                                onChange={(e) => {
                                  const permissions = e.target.checked
                                    ? [...newRole.permissions, permission.id]
                                    : newRole.permissions.filter((p) => p !== permission.id);
                                  setNewRole({ ...newRole, permissions });
                                }}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-600">{permission.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button onClick={handleAdd} className="text-green-600 hover:text-green-900">
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => setIsAdding(false)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === role.id ? (
                    <input
                      type="text"
                      value={role.name}
                      onChange={(e) => updateRole(role.id, { name: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900">{role.name}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === role.id ? (
                    <input
                      type="text"
                      value={role.description}
                      onChange={(e) => updateRole(role.id, { description: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <div className="text-sm text-gray-500">{role.description}</div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === role.id ? (
                    <div className="space-y-4">
                      {Object.entries(groupedPermissions).map(([category, perms]) => (
                        <div key={category}>
                          <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
                          <div className="space-y-2">
                            {perms.map((permission) => (
                              <label key={permission.id} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={role.permissions.includes(permission.id)}
                                  onChange={(e) => {
                                    const permissions = e.target.checked
                                      ? [...role.permissions, permission.id]
                                      : role.permissions.filter((p) => p !== permission.id);
                                    updateRole(role.id, { permissions });
                                  }}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-600">{permission.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permissionId) => {
                        const permission = permissions.find((p) => p.id === permissionId);
                        return permission ? (
                          <span
                            key={permission.id}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                          >
                            {permission.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex gap-2">
                    {editingId === role.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(role.id, role)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingId(role.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(role.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
