import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '&  .Mui-expanded': {}
  }
});

export default function Hello() {
  const classes = useStyles();
  return (
    <TreeView
      fullWidth
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 400, width: '100%', overflowY: 'auto' }}
    >
      <TreeItem
        sx={{}}
        className={classes.treeItem}
        nodeId="1"
        label={<Typography variant="h4">Application</Typography>}
      >
        <TreeItem nodeId="2" label={<Typography variant="h5">Calendar</Typography>} />
      </TreeItem>
    </TreeView>
  );
}
