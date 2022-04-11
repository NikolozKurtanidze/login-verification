import { Navigate, useNavigate } from 'react-router-dom';
import MainPage from '../MainPage';
import UserService from '../../Service/UserService';
import {useEffect} from 'react';

function ProtectedRoute(){
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
          UserService.checkServer()
          .catch((error) =>{ 
            navigate('/*');
          });
        }, 1000)
        return () => clearInterval(interval);
      }, [])

    return (
        localStorage.getItem('auth') === null ? <Navigate to={"/login"}/> : <MainPage/>
    )
}

export default ProtectedRoute;