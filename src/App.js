import React from 'react';
import MasterLayout from './layouts/MasterLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AddSpace from './pages/AddSpace';
import AuthLayout from './layouts/AuthLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import Orders from './pages/Orders';
import History from './pages/History';


function App() {
  return (
    <Routes>
      <Route path='auth' element={<AuthLayout />}>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='/' element={<MasterLayout />}>
        <Route path='' element={<Home />} />
        <Route path='space'>
          <Route path='add' element={<AddSpace />} />
          <Route path='manage' element={<AddSpace />} />
        </Route>
        <Route path='booking'>
          <Route path='' element={<Bookings />} />
          <Route path='order' element={<Orders />} />
          <Route path='history' element={<History />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
