/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import { connect } from 'react-redux';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
// redux
import { deleteTrade } from '../../../redux/action/trade';

// ----------------------------------------------------------------------

function UserMoreMenu({ deleteTrade, openSnackbar, tradeId, setOpenTradeDetailDialog }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    deleteTrade(tradeId, () => {
      setOpenDialog(false);
      openSnackbar();
    });
  };

  return (
    <>
      <Dialog open={openDialog}>
        <DialogTitle id="alertDialogTitle">Are You Sure?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete}>Yes</Button>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            setOpenTradeDetailDialog();
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:book-open-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Detail" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

const mapStateToProps = () => ({});
const mapDispatchToProps = { deleteTrade };

export default connect(mapStateToProps, mapDispatchToProps)(UserMoreMenu);
