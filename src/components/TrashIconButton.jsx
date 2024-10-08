import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledIconButton = styled(IconButton)({
  color: '#613f3f',
  '&:hover': {
    color: '#ba6767',
  },
});

const TrashIconButton = ({ onClick }) => {
  return (
    <StyledIconButton aria-label="delete" size="large">
      <DeleteIcon fontSize="inherit" onClick={onClick} />
    </StyledIconButton>
  );
};

// TODO: Implement passed props
TrashIconButton.defaultProps = {
  handleClick: () => {},
};

export default TrashIconButton;
