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
// ----------------------------------------------------------------------

export default function Router() {
  const token = localStorage["Bearer Token"];

  return useRoutes([
    {
      path: "/dashboard",
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      // element: <DashboardLayout />,

      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        {
          path: "app",
          element: <PrivateRoute component={DashboardApp} roles={4} />,
        },
        {
          path: "reports",
          element: <PrivateRoute component={Reports} roles={4} />,
        },
        {
          path: "teams",
          element: <PrivateRoute component={Teams} roles={2} />,
        },
        // eslint-disable-next-line jsx-a11y/aria-role
        {
          path: "clients",
          element: <PrivateRoute component={Clients} roles={3} />,
        },
        {
          path: "projects",
          element: <PrivateRoute component={Projects} roles={3} />,
        },
        {
          path: "settings",
          element: <PrivateRoute component={Settings} roles={4} />,
        },
        {
          path: "usersettings",
          element: <PrivateRoute component={UserSettings} roles={4} />,
        },
        {
          path: "userpage",
          element: <PrivateRoute component={UserPage} roles={4} />,
        },
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
          element: !token ? <Login /> : <Navigate to="/dashboard" />,
        },
        // { path: 'login', element: <Login /> },
        // { path: 'register', element: <Register /> },
        {
          path: "register",
          element: !token ? <Register /> : <Navigate to="/dashboard" />,
        },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/login" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    // { path: '#', element: <Navigate to="/UserDetails" /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
