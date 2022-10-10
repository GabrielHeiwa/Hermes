import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import type { RouteObject } from "react-router-dom";
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';
import Login from '../pages/login';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <Login />,
  },
];

const router = createBrowserRouter(routes);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export { routes };
export default AppRoutes;