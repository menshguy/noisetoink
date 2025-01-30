import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { DeviceProvider } from './context/DeviceContext.tsx';
import './index.css'
import App from './App.tsx'
import ArtistDemo from './components/demos/ArtistDemo.tsx';
import CustomerDemo from './components/demos/CustomerDemo.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeviceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/demo" >
            <Route path="artist" element={<ArtistDemo />} />
            <Route path="customer" element={<CustomerDemo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DeviceProvider>
  </StrictMode>,
)