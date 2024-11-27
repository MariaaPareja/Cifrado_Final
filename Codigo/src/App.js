import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import Cities from './components/Cities';
import Dashboard from './components/Dashboard';
import TouristSpots from './components/TouristSpots';
import RouteOptions from './components/RouteOptions';

function App() {

  const [destination, setDestination] = useState(null); // Estado para el destino seleccionado

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/dashboard" element={<Dashboard destination={destination}/>} />
          <Route path="/tourist-spots" element={<TouristSpots setDestination={setDestination} />} />
          <Route path="/routes-options" element={<RouteOptions />} />
          <Route path="/login-form" element={<LoginForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;