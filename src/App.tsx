import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Collection from './components/sections/collections/Collection';
import AuthPage from './components/auth/AuthPage';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
    <Routes>
      <Route path="/" element={
        <Home/>
        } />
   
          {/* When the user is at the homepage (/) show the Collections grid */}
        <Route path="/collections/:collectionName" element={<Collection />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* If you build more pages later, add them here: */}
        {/* <Route path="/collection/modern" element={<ModernCollection />} /> */}
  
    </Routes>

    </BrowserRouter>


    // <>
    // {
    //   user ? ("Logged in as: " + user.email) : "Not logged in"
    // }
    // </>
  )
}

export default App
