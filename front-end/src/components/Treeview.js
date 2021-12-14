import React from 'react';
import { Grid, List, Paper, Autocomplete, Typography, Button, Divider, Box } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Treeview(props) {
  return (
    <TreeView
      multiSelect={false}
      fullWidth
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ width: '100%', overflowY: 'auto' }}
    >
      <TreeItem sx={{}} nodeId={1} label={<Typography variant="h4">{props.parentName}</Typography>}>
        {props.children}
      </TreeItem>
    </TreeView>
  );
}
