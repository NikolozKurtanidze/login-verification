import { Navigate } from 'react-router-dom';
import MainPage from '../MainPage';

function ProtectedRoute(){

    
    return (
        localStorage.getItem('auth') === null ? <Navigate to={"/login"}/> : <MainPage/>
    )
}

export default ProtectedRoute;