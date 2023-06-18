import React from 'react';
import MasterLayout from './layouts/MasterLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';


function App() {
  return (
    <Routes>
      <Route path='/' element={<MasterLayout />}>
        <Route path='home' element={<Home />}/>
      </Route>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  );
}

export default App;
