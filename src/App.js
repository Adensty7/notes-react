import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import LoginPage from './components/LoginPage';
import LoginGoogle from './components/LoginGoogle';
import NotesPage from './components/NotesPage';

const App = () => {

  
  return ( 
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route exact path='/' element={ <NotesPage /> } />
    <Route exact path="/login" element={<LoginPage />} />
    <Route exact path="/logingoogle" element={<LoginGoogle />} />
    <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
    </BrowserRouter>
    </div>
   );
}
 
export default App;