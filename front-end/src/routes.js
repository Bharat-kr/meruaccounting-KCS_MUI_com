import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Teams from './pages/Teams';
import Reports from './pages/Reports';
import UserDetails from './pages/UserDetails';
import Clients from './pages/Clients';
import Projects from './pages/Projects';
import Settings from './pages/Settings';
import UserSettings from './pages/UserSettings';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'reports', element: <Reports /> },
        { path: 'teams', element: <Teams /> },
        { path: 'userdetails', element: <UserDetails /> },
        { path: 'clients', element: <Clients /> },
        { path: 'projects', element: <Projects /> },
        { path: 'settings', element: <Settings /> },
        { path: 'usersettings', element: <UserSettings /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    // { path: '#', element: <Navigate to="/UserDetails" /> },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
