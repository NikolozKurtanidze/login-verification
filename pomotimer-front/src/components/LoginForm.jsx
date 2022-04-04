import { useRef, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Button, Fade, TextField, Backdrop } from '@mui/material';
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
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [errorVerificationCode, setErrorVerificationCode] = useState(false);
    const [resendDisabled, setResendDisable] = useState(false);
    const [backgroundStyle, setBackgroundStyle] = useState({backgroundColor:"#334756"});

    let navigate = useNavigate();

    const handleVerificationChange = async () => {        const username = document.getElementById('outlined-username').value;
        const code = document.getElementById('outlined-verification').value;
        if(code.length != 10) {
            setErrorVerificationCode(true);
            return;
        }
        let result;
        await UserService.checkVerificationCode(username, code).then((response) => result = response.data).catch((error) => console.log(error));
        if(result)
            navigate("/home");
        else setErrorVerificationCode(true);
    }

    const handleResendClick = () => {
        setResendDisable(true);
        setBackgroundStyle({backgroundColor:"#082032"})
        setTimeout(() => {
            setResendDisable(false);
            setBackgroundStyle({backgroundColor:"#334756"})
        }, 10000);
        const username = document.getElementById('outlined-username').value;
        UserService.sendVerificationCode(username);
    }

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
        await UserService.loginUser(username, password).then(async (response) => {
            if(response.data){
                localStorage.setItem('auth', username);
                setLoading(false);
                navigate('/home');
            } if(!response.data){
                await UserService.checkUser(username, password).then(async (response) => {
                    if(response.data){
                        await UserService.sendVerificationCode(username);
                        setOpenBackdrop(true);
                        setLoading(false);
                    }else{
                        toggleErrorPassword(true);
                        toggleErrorUsername(true);
                        setLoading(false);
                    }
                });
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
                    <ThemeProvider theme={mainTheme}>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={openBackdrop}
                        >
                        <div className='main'>
                            <h2 className="header" style={{color:"black"}}>Enter verification code</h2>
                            <div style={{display:"flex", width:"fit-content", height:"fit-content"}}>
                                <TextField onChange={handleVerificationChange} error={errorVerificationCode} helperText={errorVerificationCode ? "Invalid Verification Code" : null} id='outlined-verification' label='Verification Code' required color='primary'/>
                                <Button disabled={resendDisabled} onClick={handleResendClick} sx={[{borderRadius:"5vh", borderWidth: "0.01px", borderColor:"black", marginLeft:"5%", color:"black" }, backgroundStyle]} ><img src={require('../assets/resend.png')} alt="image not found"/></Button>
                            </div>
                        </div>
                    </Backdrop>
                </ThemeProvider>
                </div>
            </FadeIn>
        </div>
    );
}

export default LoginForm;