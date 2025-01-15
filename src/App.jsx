import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
// ESTILOS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';
//ROUTES
import routes from './routes';
import store from './store';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
//PANEL
import Login from './containers/auth/Login';
import ForgotPasswordForm from './containers/auth/ForgotPasswordForm';
import ChangePasswordForm from './containers/auth/ChangePasswordForm';
//LANDING
const HomePage = React.lazy(() => import('./containers/landingPage/HomePage'));

import MainLoader from './components/Loaders/MainLoader';
import AboutPage from './containers/landingPage/AboutPage';
import ServicesPage from './containers/landingPage/ServicesPage';
import ContactPage from './containers/landingPage/ContactPage';
import WorkPage from './containers/landingPage/WorkPage';

function App() {
  return (
    <React.Suspense fallback={<MainLoader/>}>
      <HelmetProvider>
        <Provider store={store}>
          <BrowserRouter>
            <div className="h-full min-h-screen">
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  {
                    routes.map(route => (
                      <Route key={route.path} path={route.path} element={<route.component />} />
                    ))
                  }
                </Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/sobre_nosotros" element={<AboutPage />} />
                <Route path="/servicios" element={<ServicesPage />} />
                <Route path="/nuestro_trabajo" element={<WorkPage />} />
                <Route path="/contactanos" element={<ContactPage />} />
                <Route path="/panel" element={<Login />} />
                <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
                <Route path="/changePassword/:user_id" element={<ChangePasswordForm />} />
              </Routes>
            </div>
          </BrowserRouter>
        </Provider>
      </HelmetProvider>
    </React.Suspense>
  )
}

export default App
