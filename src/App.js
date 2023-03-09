import {Routes, Route } from 'react-router-dom';
import LogIn from './pages/LogIn';
import './App.css';
import Feed from './pages/Feed';

function App() {

  return (
    <div>
        <Routes>
              <Route path="/" exact element={<LogIn/>}/>
              <Route path="/feed" element={<Feed/>}/>
        </Routes>
    </div>
  );
}

export default App;
