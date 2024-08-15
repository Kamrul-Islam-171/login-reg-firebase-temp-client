import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayouts from './MainLayouts/MainLayouts.jsx';
import Home from './pages/Home.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Login from './pages/Login.jsx';
import { HelmetProvider } from 'react-helmet-async';
import Registration from './pages/Registration.jsx';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <p1>Opps Somthing went wrong. try again!</p1>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path:'/register',
    element: <Registration></Registration>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster></Toaster>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
