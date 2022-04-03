import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Button, Fade, TextField } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import mainTheme from '../Themes/mainTheme';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useNavigate } from 'react-router-dom';
import UserService from '../Service/UserService';
import './LoginForm.css';


function LoginForm(){
    const [loading, setLoading] = useState(false);
    const [errorUsername, toggleErrorUsername] = useState(false);
    const [errorPassword, toggleErrorPassword] = useState(false);

    let navigate = useNavigate();

    const userLoggedIn = async () => {
        const username = document.getElementById('outlined-username').value
        const password = document.getElementById('outlined-password').value
        if(username === '')
            toggleErrorUsername(true);
        else
            toggleErrorUsername(false);
        if(password === '')
            toggleErrorPassword(true);
        else
            toggleErrorPassword(false);
        if(password === '' || username === '')
            return;
        setLoading(true);
        await UserService.loginUser(username, password).then((response) => {
            if(response.data){
                localStorage.setItem('auth', username);
                setLoading(false);
                navigate('/home');
            } if(!response.data){
                toggleErrorPassword(true);
                toggleErrorUsername(true);
                setLoading(false);
            }         
        }).catch(error => {
            setLoading(false);
            navigate('/*');
        });
    }
    
    return(
        <div>
            <FadeIn delay={0} transitionDuration={1000}>
                <div className='main'>
                    <FadeIn delay={500} transitionDuration={700}>
                        <h1 className='header'>Login</h1>
                    </FadeIn>
                    <FadeIn delay={600} transitionDuration={700}>
                        <ThemeProvider theme={mainTheme}>
                            <TextField error={errorUsername} helperText={errorUsername ? "Enter username" : null} required color="primary" id="outlined-username" label="Username" variant="outlined"></TextField>
                        </ThemeProvider>
                    </FadeIn>
                    <FadeIn delay={700} transitionDuration={700}>
                        <ThemeProvider theme={mainTheme}>
                            <TextField error={errorPassword} helperText={errorPassword ? "Enter password" : null} required color='primary' id="outlined-password" label="Password" variant="outlined" type={"password"}></TextField>
                        </ThemeProvider>
                    </FadeIn>
                    <FadeIn delay={800} transitionDuration={700}>
                        <ThemeProvider theme={mainTheme}>
                            <Button sx={{borderRadius:"5vh", borderWidth: "0.01px", borderColor:"black", color:"black", backgroundColor:"#334756"}}  variant="outlined" onClick={userLoggedIn}>Login</Button>
                        </ThemeProvider>
                    </FadeIn>
                    <FadeIn delay={900} transitionDuration={700}>
                    <ThemeProvider theme={mainTheme}>
                            <Button sx={{borderRadius:"5vh", borderWidth: "0.01px", borderColor:"black", color:"black", backgroundColor:"#334756"}}  variant="outlined" onClick={() => navigate("/register")}>Register</Button>
                        </ThemeProvider>
                    </FadeIn>
                    <ThemeProvider theme={mainTheme}>
                        <Fade in={loading} style={{transitionDelay: loading ? '800ms' : '0ms'}}>
                            <LinearProgress color='primary' sx={{width:"100%"}}/>
                        </Fade>
                    </ThemeProvider>
                </div>
            </FadeIn>
        </div>
    );
}

export default LoginForm;