import React from 'react';
import { Typography, Box } from '@mui/material';

export default function PageHeader(props) {
  return (
    <Box sx={{ pb: 5 }}>
      <Typography variant="h2" sx={{ opacity: 0.6 }}>
        {props.title}
      </Typography>
    </Box>
  );
}
