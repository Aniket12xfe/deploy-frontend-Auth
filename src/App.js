import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./routes/login";
import Register from "./routes/register";
import AboutMeDashboard from "./routes/dashboard";
import { AuthProvider } from "./contexts/useAuth";
import PrivateRoute from "./components/private_routes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<PrivateRoute><AboutMeDashboard /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
