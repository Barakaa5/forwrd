import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { useUsersPage } from './useUsersPage';

function UsersPage() {
  const { handleErrorCountChange, handleSave, errorCountText, disabledSaveButton } =
    useUsersPage();

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList onErrorCountChange={handleErrorCountChange} />
        <p>{errorCountText}</p>
        <div className={styles.rightButtonContainer}>
          <PrimaryButton disabled={disabledSaveButton} onClick={handleSave}>
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
