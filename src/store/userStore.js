import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import initialUsersData from '../data/initialUsersData.json';

const USERS_STORAGE_KEY = 'forwrd_users';

const getInitialUsers = () => {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  const date = new Date().toISOString();
  return initialUsersData
    .map((user) => ({ ...user, date }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const useUserStore = create((set) => {
  // Set initial loading state to true
  set({ isLoading: true });

  // Simulate loading delay
  setTimeout(() => {
    set({ isLoading: false });
  }, 2000);

  return {
    users: getInitialUsers(),
    isLoading: true, // Initial state is true
    addUser: (user) =>
      set((state) => {
        const newUsers = [
          ...state.users,
          { ...user, id: uuidv4(), date: new Date().toISOString() },
        ];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(newUsers));
        return { users: newUsers };
      }),
    updateUser: (updatedUser) =>
      set((state) => {
        const newUsers = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(newUsers));
        return { users: newUsers };
      }),
    deleteUser: (userId) =>
      set((state) => {
        const newUsers = state.users.filter(({ id }) => id !== userId);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(newUsers));
        return { users: newUsers };
      }),
    setUsers: (users) => {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      set({ users });
    },
  };
});
