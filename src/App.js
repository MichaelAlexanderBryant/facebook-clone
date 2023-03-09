import {Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import './App.css';
import Feed from './pages/Feed';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <div>
      <AuthProvider>
        <Routes>
              <Route path="/" exact element={<LogIn/>}/>
              <Route path="/feed" element={<Feed/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
