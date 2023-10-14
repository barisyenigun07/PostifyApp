
import './App.css';
import NavbarComponent from './component/NavbarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import Register from './pages/Register';
import Login from './pages/Login';
import PostDetail from './component/PostDetail';




function App() {
  return (
    <div className="App">
      <NavbarComponent/>
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/post/:id' element={<PostDetail/>}/>
        </Routes>
      
    </div>
  );
}

export default App;
