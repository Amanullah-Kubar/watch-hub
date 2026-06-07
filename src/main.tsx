import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AuthProvider } from './context/AuthContext.tsx';

gsap.registerPlugin(useGSAP);

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>
)
