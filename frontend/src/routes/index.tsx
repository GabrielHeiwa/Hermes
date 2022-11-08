import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';
import Login from '../pages/login';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} hasErrorBoundary />
        <Route path="/home" element={<Home />} hasErrorBoundary />
        <Route path="/dashboard" element={<Dashboard />} hasErrorBoundary />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
