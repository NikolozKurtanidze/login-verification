import loadingIcon from "../assets/hourglass-icon.png";
import UserService from "../Service/UserService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./PageNotFound.css";
import FadeIn from 'react-fade-in/lib/FadeIn';


function PageNotFound(){


    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
          UserService.checkServer()
          .then(() => navigate('/login'));
        }, 1000)
        return () => clearInterval(interval);
      }, [])
    
    return(
        <div className="container">
            <FadeIn delay={0} transitionDuration={1000}>
                <img className={"error-icon"} src={loadingIcon} alt="gif not found"/>
            </FadeIn>
            <FadeIn delay={800} transitionDuration={1000}>
                <h1 className="header">Error Occured</h1>
            </FadeIn>
        </div>
    );
}

export default PageNotFound;