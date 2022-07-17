import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import { Dashboard } from "../pages/dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { BsFillXDiamondFill, BsStack } from "react-icons/bs";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {routesData.map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export const routesData = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
