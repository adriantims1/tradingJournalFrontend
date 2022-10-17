/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, useRoutes } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
// redux
import { checkSession } from './redux/action/authorization';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

// ----------------------------------------------------------------------

function Router({ checkSession }) {
  useEffect(() => {
    checkSession();
  }, []);
  return useRoutes([
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute element={<DashboardLayout />} />,
      children: [
        { path: 'app', element: <ProtectedRoute element={<DashboardApp />} /> },
        { path: 'trade', element: <ProtectedRoute element={<User />} /> },
        { path: 'news', element: <ProtectedRoute element={<Products />} /> },
        { path: 'blog', element: <ProtectedRoute element={<Blog />} /> },
      ],
    },

    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="login" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}

const mapStateToProps = () => ({});

const mapDispatchToProps = { checkSession };

export default connect(mapStateToProps, mapDispatchToProps)(Router);
