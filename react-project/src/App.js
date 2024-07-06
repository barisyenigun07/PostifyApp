
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import Register from './pages/Register';
import Login from './pages/Login';
import PostDetail from './component/PostDetail';
import NavBar from './component/NavBar';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/post/:id' element={<PostDetail/>}/>
          <Route path='/user/:id' element={<UserProfile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
