import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import AutocompleteField from '../../../components/AutocompleteField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';
import countryOptions from '../../../data/countries.json';
import { userSchema } from '../../../schemas/userSchema';

const UserRow = ({ user, onUpdate, onDelete, errors, setErrors }) => {
  const handleChange = (field, value) => {
    const updatedUser = { ...user, [field]: value };
    const isValid = validateField(field, updatedUser);
    if (isValid) {
      onUpdate(updatedUser);
    }
  };

  const validateField = (field, updatedUser) => {
    const result = userSchema.safeParse(updatedUser);
    if (result.success) {
      const newErrors = { ...errors };
      delete newErrors[user.id]?.[field];
      setErrors(newErrors);
      return true;
    } else {
      const fieldError = result.error.issues.find((issue) => issue.path[0] === field);
      setErrors({
        ...errors,
        [user.id]: { ...errors[user.id], [field]: fieldError?.message || null },
      });
      return false;
    }
  };

  return (
    <Grid container spacing={2} alignItems="center" className={styles.userRow}>
      <Grid item xs={2.5}>
        <InputField
          value={user.name}
          onChangeHandler={(e) => handleChange('name', e.target.value)}
          error={!!errors[user.id]?.name}
          helperText={errors[user.id]?.name}
          placeholder="Name"
          fullWidth
        />
      </Grid>
      <Grid item xs={2.5}>
        <AutocompleteField
          value={user.country}
          onChange={(_, value) => handleChange('country', value)}
          options={countryOptions}
          error={!!errors[user.id]?.country}
          helperText={errors[user.id]?.country}
          placeholder="Country"
          fullWidth
        />
      </Grid>
      <Grid item xs={2.5}>
        <InputField
          value={user.email}
          onChangeHandler={(e) => handleChange('email', e.target.value)}
          error={!!errors[user.id]?.email}
          helperText={errors[user.id]?.email}
          placeholder="Email"
          fullWidth
        />
      </Grid>
      <Grid item xs={2.5}>
        <InputField
          value={user.phone}
          onChangeHandler={(e) => handleChange('phone', e.target.value)}
          error={!!errors[user.id]?.phone}
          helperText={errors[user.id]?.phone}
          placeholder="Phone"
          fullWidth
        />
      </Grid>
      <Grid item xs={1}>
        <TrashIconButton onClick={() => onDelete(user.id)} />
      </Grid>
    </Grid>
  );
};

export default UserRow;
