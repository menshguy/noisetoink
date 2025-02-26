import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { DeviceProvider } from './context/DeviceContext.tsx';
import { AppModeProvider } from './context/AppModeContext.tsx';
import './index.css'
import App from './App.tsx'
import ArtistDemo from './components/demos/ArtistDemo.tsx';
import CustomerDemo from './components/demos/CustomerDemo.tsx';
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Welcome from './components/auth/Welcome'
import MainNav from './components/nav/MainNav'
import FeedbackWidget from 'instant-feedback';
      

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppModeProvider>
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
          <FeedbackWidget 
            label="Noise to Ink (Full App)" // Required - identifies the feature being rated
            icon="💭"       // Optional - default is 💭
            text="Feedback?" // Optional - text to show below icon
            position="bottom-right" // Optional - one of: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
            // prefillEmail="TODO: ADD USERS EMAIL"
            formId="mzzdljjz"
            containerstyle={{
              'border-radius': '16px',
              'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.1)',
              'font-family': 'monospace',
              'font-size': '12px !important',
              'padding': '10px'
            }}
          />
        </BrowserRouter>
      </DeviceProvider>
    </AppModeProvider>
  </StrictMode>,
)