import { useId } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';
import Login from '../pages/login';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {routesData.map(({ path, element }) => {
          const id = useId();

          return <Route key={id} path={path} element={element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export const routesData = [
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
