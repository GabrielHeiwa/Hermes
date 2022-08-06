import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/dashboard'
import Home from '../pages/Home'
import Login from "../pages/Login";
import { useId } from 'react'

export default function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        {
          routesData.map(({ path, element }) => {
            const id = useId()
            
            return <Route key={id} path={path} element={element} />
          })
        }
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
