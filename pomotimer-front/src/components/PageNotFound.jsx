import loadingIcon from "../assets/hourglass-icon.png";
import "./PageNotFound.css";
import FadeIn from 'react-fade-in/lib/FadeIn';


function PageNotFound(){

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