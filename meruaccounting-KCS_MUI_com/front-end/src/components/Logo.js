import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

// Logo.propTypes = {
//   sx: PropTypes.object
// };

export default function Logo({ sx }) {
  return (
    <Box
      component="img"
      src="/static/meru1024.svg"
      sx={{ width: 150, height: 70, backgroundColor: 'white' }}
    />
  );
}
