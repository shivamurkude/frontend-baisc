// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Form from './Pages/Form';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/user-form" element={<Form />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
