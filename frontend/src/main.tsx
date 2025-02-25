import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { DeviceProvider } from './context/DeviceContext.tsx';
import './index.css'
import App from './App.tsx'
import ArtistDemo from './components/demos/ArtistDemo.tsx';
import CustomerDemo from './components/demos/CustomerDemo.tsx';
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Welcome from './components/auth/Welcome'
import MainNav from './components/nav/MainNav'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeviceProvider>
      <BrowserRouter>
        <MainNav />
        <Routes>
          <Route path="/" element={<App />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/welcome" element={<Welcome />} />

          <Route path="/demo" >
            <Route path="artist" element={<ArtistDemo />} />
            <Route path="customer" element={<CustomerDemo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DeviceProvider>
  </StrictMode>,
)