import './App.css';
import LoginForm from './components/LoginForm';
import PageNotFound from './components/PageNotFound';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import StrictOpenRoute from './components/Routes/StrictOpenRoute';
import RegistrationForm from './components/RegistrationForm';

function App() {


  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to={"/login"}/>}/>
        <Route path='/login' element={<StrictOpenRoute element={<LoginForm />}/>}/>
        <Route path="/home" element={<ProtectedRoute/>} />
        <Route path="/register" element={<StrictOpenRoute element={<RegistrationForm />}/>}/>
        <Route path='*' element={<PageNotFound />}/> 
      </Routes>
    </Router>
  );
}

export default App;
