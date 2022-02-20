import { useContext } from "react";
import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import NotFound from "./pages/Page404";
import Teams from "./pages/Teams";
import Reports from "./pages/Reports";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import UserSettings from "./pages/UserSettings";
import UserPage from "./pages/UserPage";
import EmployeePage from "./pages/EmployeePage";
import { PrivateRoute } from "./components/privatroutes";
import { employeeContext } from "./contexts/EmployeeContext";
import { getAllEmployee } from "src/api/admin api/admin";
import { teamContext } from "./contexts/TeamsContext";
import { loginContext } from "./contexts/LoginContext";
import { CurrentUserContext } from "src/contexts/CurrentUserContext";
import {
  getCommonData,
  getTeamCommonData,
  projectMemberCommonData,
} from "./api/auth api/commondata";
import SavedReports from "./pages/SavedReports";
// ----------------------------------------------------------------------

export default function Router() {
  const token = localStorage["Bearer Token"];
  const { commonData } = useContext(teamContext);
  const {
    dispatchTeamCommonData,
    projectMemberData,
    dispatchProjectMemberData,
    dispatchCommonData,
  } = useContext(CurrentUserContext);

  const { loginC } = useContext(loginContext);
  const { dispatchAdminAllEmployee } = useContext(employeeContext);
  React.useLayoutEffect(() => {
    if (loginC?.userData?.role === "admin")
      getAllEmployee(dispatchAdminAllEmployee);
    else if (loginC?.userData?.role === "manager")
      getTeamCommonData(dispatchTeamCommonData);
    else if (loginC?.userData?.role === "projectLeader")
      projectMemberCommonData(dispatchProjectMemberData);
    getCommonData(dispatchCommonData);
  }, [commonData]);
  console.log(projectMemberData);
  return useRoutes([
    {
      path: "/dashboard",
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      // element: <DashboardLayout />,

      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        // all
        {
          path: "app",
          element: <PrivateRoute component={DashboardApp} roles={4} />,
        },
        // all
        {
          path: "reports",
          element: <PrivateRoute component={Reports} roles={4} />,
        },
        // till manager
        {
          path: "teams",
          element: <PrivateRoute component={Teams} roles={2} />,
        },
        // eslint-disable-next-line jsx-a11y/aria-role
        // till projectLeader
        {
          path: "clients",
          element: <PrivateRoute component={Clients} roles={2} />,
        },
        // till projectLeader
        {
          path: "projects",
          element: <PrivateRoute component={Projects} roles={3} />,
        },
        // all
        {
          path: "settings",
          element: <PrivateRoute component={Settings} roles={2} />,
        },
        // all
        {
          path: "usersettings",
          element: <PrivateRoute component={UserSettings} roles={4} />,
        },
        // all
        {
          path: "userpage",
          element: <PrivateRoute component={UserPage} roles={4} />,
        },
        // till teamLeader
        {
          path: "employeepage/:id",
          element: <PrivateRoute component={EmployeePage} roles={3} />,
        },
      ],
    },

    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        {
          path: "login",
          element: !token ? <Login /> : <Navigate to="/dashboard/app" />,
        },
        // { path: 'login', element: <Login /> },
        // { path: 'register', element: <Register /> },
        {
          path: "register",
          element: !token ? <Register /> : <Navigate to="/dashboard/app" />,
        },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/login" /> },
        { path: "*", element: <Navigate to="/404" /> },
        { path: "/reports/sharedReports/:id", element: <SavedReports /> },
      ],
    },
    // { path: '#', element: <Navigate to="/UserDetails" /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
