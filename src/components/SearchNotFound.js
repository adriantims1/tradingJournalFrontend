import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No Trade
      </Typography>
      <Typography variant="body2" align="center">
        <strong>{'Oops!'}</strong> Seems like you haven't add any trade.
      </Typography>
    </Paper>
  );
}
