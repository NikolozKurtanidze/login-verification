import { Navigate, useNavigate } from "react-router-dom";
import {useEffect} from 'react';
import UserService from "../../Service/UserService";

function StrictOpenRoute(props){

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

    return(
        localStorage.getItem('auth') !== null ? <Navigate to={"/home"}/> : props.element
    );
}

export default StrictOpenRoute;