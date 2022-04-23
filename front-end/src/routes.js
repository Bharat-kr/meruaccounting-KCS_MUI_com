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
import Profile from "./pages/Profile";
import UserSettings from "./pages/UserSettings";
import UserPage from "./pages/UserPage";
import EmployeePage from "./pages/EmployeePage";
import { PrivateRoute } from "./components/privatroutes";
import { employeeContext } from "./contexts/EmployeeContext";
import { getAllEmployee } from "src/api/admin api/admin";
import { teamContext } from "./contexts/TeamsContext";
import { loginContext } from "./contexts/LoginContext";
import { CurrentUserContext } from "src/contexts/CurrentUserContext";
import { ClientsContext } from "src/contexts/ClientsContext";
import { reportsContext } from "./contexts/ReportsContext";
import axios from "axios";

import {
  getCommonData,
  getTeamCommonData,
  projectMemberCommonData,
} from "./api/auth api/commondata";
import { getClient } from "./api/clients api/clients";

import SavedReports from "./pages/SavedReports";
import DownloadReport from "./pages/DownloadReport";
import { getTeam } from "./api/teams api/teams";
import { Role } from "./_helpers/role";
import { getReports } from "./api/reports api/reports";
import Reset from "./pages/Reset";

// ----------------------------------------------------------------------

export default function Router() {
  const token = localStorage["Bearer Token"];
  const { dispatchgetTeam, commonData } = useContext(teamContext);
  const {
    dispatchTeamCommonData,
    projectMemberData,
    dispatchProjectMemberData,
    dispatchCommonData,
  } = useContext(CurrentUserContext);
  const {
    date,

    allOptionsFunc,
    employeeOptions,
    employeesOptionsFunc,
    projectOptions,
    projectsOptionsFunc,
    clientOptions,
    clientsOptionsFunc,
    employees,
    employeesFunc,
    projects,
    projectsFunc,
    clients,
    clientsFunc,
    group,
    disableStateFunc,
  } = React.useContext(reportsContext);

  const { dispatchClientDetails } = useContext(ClientsContext);
  const { loginC } = useContext(loginContext);
  const { dispatchAdminAllEmployee } = useContext(employeeContext);

  React.useLayoutEffect(() => {
    if (loginC) {
      getClient(dispatchClientDetails);
      if (Role.indexOf(loginC.userData.role <= 2)) getTeam(dispatchgetTeam);
      if (loginC?.userData?.role === "admin")
        getAllEmployee(dispatchAdminAllEmployee);
      else if (loginC?.userData?.role === "manager")
        getTeamCommonData(dispatchTeamCommonData);
      else if (loginC?.userData?.role === "projectLeader")
        projectMemberCommonData(dispatchProjectMemberData);
      getCommonData(dispatchCommonData);
    }
  }, [commonData]);
  const getOptions = async () => {
    axios.post("/report/options").then((res) => {
      allOptionsFunc(res.data);
      projectsOptionsFunc(res.data.projectsClientsOptions[0].projects);
      projectsFunc(res.data.projectsClientsOptions[0].projects);
      clientsOptionsFunc(res.data.projectsClientsOptions[0].clients);
      clientsFunc(res.data.projectsClientsOptions[0].clients);
      const empArr = Array.from(
        res.data.employeesOptions[0].members,
        function mapFn(mem, index) {
          return { _id: mem._id, name: `${mem.firstName} ${mem.lastName}` };
        }
      );
      employeesOptionsFunc(empArr);
      employeesFunc(empArr);
    });
  };
  React.useEffect(() => {
    if (loginC) {
      getOptions();
    }
  }, []);
  React.useEffect(() => {
    disableStateFunc(false);
  }, [
    employeeOptions,
    projectOptions,
    projects,
    clientOptions,
    clients,
    employees,
    date,
    group,
  ]);

  // reset the getoptions thing when no option is selected
  React.useEffect(() => {
    if (!employees) {
      axios.post("/report/options").then((res) => {
        const empArr = Array.from(
          res.data.employeesOptions[0].members,
          function mapFn(mem, index) {
            return { _id: mem._id, name: `${mem.firstName} ${mem.lastName}` };
          }
        );
        employeesFunc(empArr);
      });
    }
    if (!projects) {
      axios.post("/report/options").then((res) => {
        projectsFunc(res.data.projectsClientsOptions[0].projects);
      });
    }
    if (!clients) {
      axios.post("/report/options").then((res) => {
        clientsFunc(res.data.projectsClientsOptions[0].clients);
      });
    }
  }, [employees, projects, clients]);

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
          path: "profile",
          element: <PrivateRoute component={Profile} roles={4} />,
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
        { path: "/downloadReportPdf/:id", element: <DownloadReport /> },
        { path: "/passwordReset/:id/:token", element: <Reset /> },
      ],
    },
    // { path: '#', element: <Navigate to="/UserDetails" /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
