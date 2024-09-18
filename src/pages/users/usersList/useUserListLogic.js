import { useState, useMemo } from 'react';
import { useUserStore } from '../../../store/userStore';

export function useUserListLogic(onErrorCountChange) {
  const { users, addUser, updateUser, deleteUser, isLoading } = useUserStore();
  console.log('users', users);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  console.log('errors', errors);

  const updateErrorCounts = (newErrors) => {
    const errorValues = Object.values(newErrors)
      .map((e) => Object.values(e))
      .flat();
    const emptyCount = errorValues.filter((e) => e === 'required').length;
    const invalidCount = errorValues.length - emptyCount;
    onErrorCountChange(emptyCount, invalidCount);
  };

  const setErrorsAndUpdateCounts = (newErrors) => {
    setErrors(newErrors);
    updateErrorCounts(newErrors);
  };

  const handleAddUser = () => {
    const newUser = {
      date: new Date().toISOString(),
      name: '',
      country: '',
      email: '',
      phone: '',
    };
    addUser(newUser);
  };

  const handleUpdateUser = (updatedUser) => updateUser(updatedUser);

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[userId];
      return newErrors;
    });
  };

  const filteredAndSortedUsers = useMemo(() => {
    return users
      .filter((user) =>
        Object.values(user).some((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [users, searchTerm]);

  return {
    filteredAndSortedUsers,
    errors,
    searchTerm,
    isLoading,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
    setSearchTerm,
    setErrorsAndUpdateCounts,
  };
}
