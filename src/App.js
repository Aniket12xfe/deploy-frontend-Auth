import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./routes/login";
import AboutMeDashboard from "./routes/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<AboutMeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
