import React from 'react';
import MasterLayout from './layouts/MasterLayout';
import { Route, Router } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Route path='/' element={<MasterLayout />}>
        
      </Route>
      <Route path='*'>

      </Route>
    </Router>
  );
}

export default App;
