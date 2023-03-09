import {Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import './App.css';
import Feed from './pages/Feed';
import { AuthProvider } from './context/AuthContext';
import PrivateRouteLogIn from './utils/PrivateRouteLogIn';
import PrivateRouteFeed from './utils/PrivateRouteFeed';

function App() {

  return (
    <div>
      <AuthProvider>
        <Routes>
            <Route path="/" exact element={<PrivateRouteLogIn/>}>
              <Route path="/" exact element={<LogIn/>}/>
            </Route>
            <Route path="/feed" element={<PrivateRouteFeed/>}>
              <Route path="/feed" element={<Feed/>}/>
            </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
