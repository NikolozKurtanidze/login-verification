import { useNavigate } from 'react-router-dom';
import './MainPage.css';


function MainPage(){

    const navigate = useNavigate();

    return(
        <div className='main-card'>
            <h1 className='header-top'>Pomotimer</h1>
            <button onClick={() => {
                navigate("/login");
                localStorage.removeItem('auth');
            }}>Logout</button>
        </div>
    );
}

export default MainPage;