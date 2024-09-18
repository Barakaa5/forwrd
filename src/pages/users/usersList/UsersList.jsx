import { Typography, CircularProgress } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import InputField from '../../../components/InputField';
import styles from '../users.module.css';
import { useUserListLogic } from './useUserListLogic';

function UsersList({ onErrorCountChange }) {
  const {
    filteredAndSortedUsers,
    errors,
    searchTerm,
    isLoading,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
    setSearchTerm,
    setErrorsAndUpdateCounts,
  } = useUserListLogic(onErrorCountChange);

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List ({filteredAndSortedUsers.length})</Typography>
        <AddButton onClick={handleAddUser} />
      </div>
      <InputField
        label="Search users"
        value={searchTerm}
        onChangeHandler={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, email, country, or phone"
      />
      <div className={styles.usersListContent}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          filteredAndSortedUsers.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              errors={errors}
              onUpdate={handleUpdateUser}
              onDelete={handleDeleteUser}
              setErrors={setErrorsAndUpdateCounts}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default UsersList;
