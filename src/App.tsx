import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Collection from './components/sections/collections/Collection';

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

        {/* If you build more pages later, add them here: */}
        {/* <Route path="/collection/modern" element={<ModernCollection />} /> */}
  
    </Routes>

    </BrowserRouter>
  )
}

export default App
