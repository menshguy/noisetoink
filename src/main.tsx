import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from 'styled-components'
import './index.css'
import App from './App.tsx'
import ArtistDemo from './components/demos/ArtistDemo.tsx';
import CustomerDemo from './components/demos/CustomerDemo.tsx';

// Define a basic theme
const theme = {
  colors: {
    primary: '#000000',
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/demo" >
            <Route path="artist" element={<ArtistDemo />} />
            <Route path="customer" element={<CustomerDemo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)