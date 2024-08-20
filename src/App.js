import './App.css';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import RightBar from './pages/rightBar/RightBar';
import TopBar from './components/topBar/TopBar';
import SideBar from './components/sideBar/SideBar';
import DocteurForm from './pages/docteur/docteurForm/DocteurForm';
import Utilisateur from './pages/utilisateur/Utilisateur';
import Patient from './pages/patient/Patient';
import PatientForm from './pages/patient/form/PatientForm';
import FormService from './pages/service/formService/FormService';
import ListeDocteur from './pages/docteur/ListeDocteur/ListeDocteur';
import Consultation from './pages/consultation/Consultation';
import Service from './pages/service/Service';

function App() {
  const [currentUser, setCurrentUser] = useState(true);

  const Layout = () => (
    <div className='app-rows'>
      <TopBar />
      <div className="app-container">
        <SideBar />
        <div className="app-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );

  const SecureRoute = ({ children }) => (
    !currentUser ? <Navigate to="/login" /> : children
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SecureRoute><Layout /></SecureRoute>,
      children: [
        { path: '/', 
          element: <RightBar /> 
        },
        {
          path: '/form_personnel',
          element: <DocteurForm />
        },
        {
          path: '/liste_docteur',
          element: <ListeDocteur/>
        },
        {
          path: '/form_user',
          element: <Utilisateur/>
        },
        {
          path: '/liste_user',
          element: <Utilisateur />
        },
        {
          path: '/form_patient',
          element: <PatientForm />
        },
        {
          path: '/liste_patient',
          element: <Patient />
        },
        {
          path: '/form_service',
          element: <FormService />
        },
        {
          path: '/liste_service',
          element: <Service />
        },
        {
          path: '/consultation',
          element: <Consultation />
        },
        {
          path: '/liste_consultation',
          element: <Consultation />
        },
      ]
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
