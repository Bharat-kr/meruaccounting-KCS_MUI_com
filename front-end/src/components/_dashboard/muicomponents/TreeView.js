import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export default function FileSystemNavigator() {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="Employee">
        <TreeItem nodeId="2" label="Ayush" />
        <TreeItem nodeId="2" label="kamal" />
      </TreeItem>
      <TreeItem nodeId="5" label="Project">
        <TreeItem nodeId="10" label="Microsoft" />
        <TreeItem nodeId="6" label="Google">
          <TreeItem nodeId="8" label="Web Dev" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}
