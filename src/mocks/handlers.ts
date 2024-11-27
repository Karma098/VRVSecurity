import { http, HttpResponse } from 'msw';
import { User, Role, Permission } from '../types';

let users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@vrvsecurity.com',
    roleId: '1',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop&q=60',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@vrvsecurity.com',
    roleId: '2',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&q=60',
  },
];

let roles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: ['users.read', 'users.write', 'users.delete', 'roles.read', 'roles.write', 'roles.delete'],
  },
  {
    id: '2',
    name: 'User Manager',
    description: 'Can manage users',
    permissions: ['users.read', 'users.write'],
  },
];

const permissions: Permission[] = [
  { id: 'users.read', name: 'Read Users', category: 'Users' },
  { id: 'users.write', name: 'Write Users', category: 'Users' },
  { id: 'users.delete', name: 'Delete Users', category: 'Users' },
  { id: 'roles.read', name: 'Read Roles', category: 'Roles' },
  { id: 'roles.write', name: 'Write Roles', category: 'Roles' },
  { id: 'roles.delete', name: 'Delete Roles', category: 'Roles' },
];

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json(users);
  }),

  http.post('/api/users', async ({ request }) => {
    const user = await request.json();
    const newUser = { ...user, id: String(users.length + 1) };
    users = [...users, newUser];
    return HttpResponse.json(newUser);
  }),

  http.put('/api/users/:id', async ({ params, request }) => {
    const updatedUser = await request.json();
    users = users.map((user) => 
      user.id === params.id ? { ...user, ...updatedUser } : user
    );
    return HttpResponse.json(updatedUser);
  }),

  http.delete('/api/users/:id', ({ params }) => {
    users = users.filter((user) => user.id !== params.id);
    return HttpResponse.json({ success: true });
  }),

  http.get('/api/roles', () => {
    return HttpResponse.json(roles);
  }),

  http.post('/api/roles', async ({ request }) => {
    const role = await request.json();
    const newRole = { ...role, id: String(roles.length + 1) };
    roles = [...roles, newRole];
    return HttpResponse.json(newRole);
  }),

  http.put('/api/roles/:id', async ({ params, request }) => {
    const updatedRole = await request.json();
    roles = roles.map((role) => 
      role.id === params.id ? { ...role, ...updatedRole } : role
    );
    return HttpResponse.json(updatedRole);
  }),

  http.delete('/api/roles/:id', ({ params }) => {
    roles = roles.filter((role) => role.id !== params.id);
    return HttpResponse.json({ success: true });
  }),

  http.get('/api/permissions', () => {
    return HttpResponse.json(permissions);
  }),
];