import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import NoteIcon from "@mui/icons-material/Note";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Description from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
// ----------------------------------------------------------------------

const getIcon = function (name) {
  return <Icon icon={name} width={22} height={22} />;
};

export const sidebarConfigfn = function (currentRoleIndex) {
  if (currentRoleIndex === 4)
    return [
      {
        title: "Home",
        path: "/dashboard/userpage",
        icon: <HomeIcon />,
      },
      {
        title: "dashboard",
        path: "/dashboard/app",
        icon: getIcon(pieChart2Fill),
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <NoteIcon />,
      },
    ];
  else if (currentRoleIndex === 3)
    return [
      {
        title: "Home",
        path: "/dashboard/userpage",
        icon: <HomeIcon />,
      },
      {
        title: "dashboard",
        path: "/dashboard/app",
        icon: getIcon(pieChart2Fill),
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <NoteIcon />,
      },
      {
        title: "Projects",
        path: "/dashboard/projects",
        icon: <Description />,
      },
    ];
  return sidebarConfig;
};

const sidebarConfig = [
  {
    title: "Home",
    path: "/dashboard/userpage",
    icon: <HomeIcon />,
  },
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "Reports",
    path: "/dashboard/reports",
    icon: <NoteIcon />,
  },
  {
    title: "Teams",
    path: "/dashboard/teams",
    icon: <AdminPanelSettingsIcon />,
  },
  {
    title: "Clients",
    path: "/dashboard/clients",
    icon: <GroupIcon />,
  },
  {
    title: "Projects",
    path: "/dashboard/projects",
    icon: <Description />,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <SettingsIcon />,
  },
];

export { sidebarConfig as sidebarConfigDefault };
