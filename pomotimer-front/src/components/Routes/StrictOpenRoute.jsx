import LoginForm from "../LoginForm";
import { Navigate } from "react-router-dom";


function StrictOpenRoute(props){

    return(
        localStorage.getItem('auth') !== null ? <Navigate to={"/home"}/> : props.element
    );
}

export default StrictOpenRoute;