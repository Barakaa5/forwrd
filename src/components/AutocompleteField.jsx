import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteField = ({
  value,
  onChange,
  options,
  error,
  helperText,
  placeholder,
  ...props
}) => {
  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          variant="outlined"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              padding: '0px 14px',
              backgroundColor: '#909196',
              '&:hover': {
                backgroundColor: '#909196',
              },
              '&.Mui-focused': {
                backgroundColor: '#909196',
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: '10px 14px',
            },
          }}
        />
      )}
      {...props}
    />
  );
};

AutocompleteField.defaultProps = {
  options: [],
  error: false,
  helperText: '',
  placeholder: '',
};

export default AutocompleteField;
