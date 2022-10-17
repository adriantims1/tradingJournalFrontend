/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, IconButton } from '@mui/material';
// redux
import { connect } from 'react-redux';
import { resetState } from '../../redux/action/global';
// components
import Iconify from '../../components/Iconify';
//
import Searchbar from './Searchbar';
// import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

function DashboardNavbar({ onOpenSidebar, resetState }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    resetState(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />

        <Box sx={{ flexGrow: 1 }} />
        <Button Button variant="contained" startIcon={<Iconify icon="eva:log-out-fill" />} onClick={handleLogout}>
          Logout
        </Button>
      </ToolbarStyle>
    </RootStyle>
  );
}
const mapStateToProps = () => ({});

const mapDispatchToProps = { resetState };
export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavbar);
