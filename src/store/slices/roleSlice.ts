import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Role } from '../../types';

interface RoleState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
};

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
  const response = await fetch('/api/roles');
  return response.json();
});

export const addRole = createAsyncThunk('roles/addRole', async (role: Omit<Role, 'id'>) => {
  const response = await fetch('/api/roles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(role),
  });
  return response.json();
});

export const updateRole = createAsyncThunk(
  'roles/updateRole',
  async ({ id, role }: { id: string; role: Partial<Role> }) => {
    const response = await fetch(`/api/roles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(role),
    });
    return response.json();
  }
);

export const deleteRole = createAsyncThunk('roles/deleteRole', async (id: string) => {
  await fetch(`/api/roles/${id}`, { method: 'DELETE' });
  return id;
});

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch roles';
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex((role) => role.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter((role) => role.id !== action.payload);
      });
  },
});

export default roleSlice.reducer;