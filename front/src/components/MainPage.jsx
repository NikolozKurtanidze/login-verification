import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './MainPage.css';
import { useState } from 'react';


function MainPage(){

    const navigate = useNavigate();

    return(
        <div className='main-wrapper'>
            <div className='main-card'>
                <h2 className='header'>You are on main screen!</h2>
                <Button sx={{marginTop: "10%", borderRadius:"5vh", borderWidth: "0.01px", borderColor:"black", color:"black", backgroundColor:"#334756"}}  variant="outlined"
                    onClick={() => {
                        localStorage.removeItem('auth');
                        navigate("/login");
                    }}>Logout</Button>
            </div>
        </div>
    );
}

export default MainPage;