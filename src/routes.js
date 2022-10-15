import { BrowserRouter, Routes, Route, Navigate, useRoutes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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

export default function Router() {
  // return (
  //   <BrowserRouter>
  //     <Routes path="/dashboard" element={<DashboardLayout />}>
  //       <ProtectedRoute index element={<DashboardApp />} />
  //       <ProtectedRoute path="trade" element={<User />} />
  //       <ProtectedRoute path="news" element={<Products />} />
  //       <ProtectedRoute path="blog" element={<Blog />} />
  //       <Route path="*" element={<NotFound />} />
  //     </Routes>
  //     <Routes path="/" element={<LogoOnlyLayout />}>
  //       <Route index element={<Login />} />
  //       <Route path="*" element={<NotFound />} />
  //     </Routes>
  //   </BrowserRouter>
  // );
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
