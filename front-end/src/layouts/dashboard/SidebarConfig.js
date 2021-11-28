import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import PersonIcon from '@mui/icons-material/Person';
import NoteIcon from '@mui/icons-material/Note';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Description from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: <PersonIcon />
  },
  {
    title: 'Reports',
    path: '/dashboard/reports',
    icon: <NoteIcon />
  },
  {
    title: 'Teams',
    path: '/dashboard/teams',
    icon: <AdminPanelSettingsIcon />
  },
  {
    title: 'Clients',
    path: '/dashboard/clients',
    icon: <GroupIcon />
  },
  {
    title: 'Projects',
    path: '/dashboard/projects',
    icon: <Description />
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: <SettingsIcon />
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon(personAddFill)
  }
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
