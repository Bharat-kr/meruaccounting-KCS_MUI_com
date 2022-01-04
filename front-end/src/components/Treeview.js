import React from 'react';
import { Typography} from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Treeview(props) {
  return (
    <TreeView
      multiSelect={false}
      fullWidth
      onClick={props.onClick}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ width: '100%'}}
    >
      <TreeItem sx={{}} nodeId="1" label={<Typography variant="h4">{props.parentName}</Typography>}>
        {props.children}
      </TreeItem>
    </TreeView>
  );
}
