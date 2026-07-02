import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Collection from './components/sections/collections/Collection';
import AuthPage from './components/auth/AuthPage';
import SsoCallback from './components/auth/SsoCallback';
import VerifyEmail from './components/auth/VarifyEmail';
import UserSync from './components/auth/UserSync';

function App() {

  return (
    <>
      <BrowserRouter>
        <UserSync />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <Home />
          } />
          <Route path="/collections/:collectionName" element={<Collection />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/sso-callback" element={<SsoCallback />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>

      </BrowserRouter>

    </>

    // <>
    // {
    //   user ? ("Logged in as: " + user.email) : "Not logged in"
    // }
    // </>
  )
}

export default App
