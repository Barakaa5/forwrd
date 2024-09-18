import { useState } from 'react';
import { useUserStore } from '../../store/userStore';

export function useUsersPage() {
  const { users, setUsers } = useUserStore();
  const [errorCount, setErrorCount] = useState({ empty: 0, invalid: 0 });

  const handleErrorCountChange = (emptyCount, invalidCount) => {
    setErrorCount({ empty: emptyCount, invalid: invalidCount });
  };

  const handleSave = () => {
    setUsers(users);
    setErrorCount({ empty: 0, invalid: 0 }); // Reset local error states
  };

  const disabledSaveButton = errorCount.empty > 0 || errorCount.invalid > 0;
  const errorCountText = `Errors: Empty Fields - ${errorCount.empty}, Invalid Fields - ${errorCount.invalid}`;

  return {
    handleErrorCountChange,
    handleSave,
    errorCountText,
    disabledSaveButton,
  };
}
