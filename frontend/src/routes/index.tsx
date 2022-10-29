import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';
import Login from '../pages/login';
import { useAuthenticated } from '../hooks/authenticated';

function AppRoutes() {
  const { isAuthenticated } = useAuthenticated();

  return (
    <Routes>
      <Route path="/login" element={<Login />} hasErrorBoundary />
      <Route path="/home" element={<Home />} hasErrorBoundary />
      {isAuthenticated ? <Route path="/dashboard" element={<Dashboard />} hasErrorBoundary /> : <></>}
    </Routes>
  );
}

export default AppRoutes;
