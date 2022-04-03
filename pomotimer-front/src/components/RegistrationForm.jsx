import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Button, Fade, TextField, Backdrop } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import mainTheme from '../Themes/mainTheme';
import FadeIn from 'react-fade-in/lib/FadeIn';
import UserService from '../Service/UserService';
import { useNavigate } from 'react-router-dom';


function RegistrationForm(){
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorRepeatPassword, setErrorRepeatPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorVerificationCode, setErrorVerificationCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const navigate = useNavigate();
    

    const handleVerificationChange = async () => {
        const username = document.getElementById('outlined-username').value;
        const code = document.getElementById('outlined-verification').value;
        if(code.length != 10) {
            setErrorVerificationCode(true);
            return;
        }
        let result;
        await UserService.checkVerificationCode(username, code).then((response) => result = response.data).catch((error) => console.log(error));
        console.log(result);
        if(result)
            navigate("/home");
        else setErrorVerificationCode(true);
    }

    const registerUser = async () => {
        setLoading(true);
        const email = document.getElementById('outlined-email').value;
        const username = document.getElementById('outlined-username').value;
        const password = document.getElementById('outlined-password').value;
        const repeatPassword = document.getElementById('outlined-repeat').value;
        if(email === '') setErrorEmail(true);
        else setErrorEmail(false);
        if(username === '') setErrorUsername(true);
        else setErrorUsername(false);
        if(password === '') setErrorPassword(true);
        else setErrorPassword(false);
        if(repeatPassword === '') setErrorRepeatPassword(true);
        else setErrorRepeatPassword(false);
        if(email === '' || username === '' || password === '' || repeatPassword === '') return;
        let result;
        await UserService.registerUser(username, password, email).then((response) => result = response.data).catch((reason) => console.log(reason));
        console.log(result);
        if(result){
            UserService.sendVerificationCode(username);
            setOpenBackdrop(true);
        }
    }


    return(
    <div>
        <FadeIn delay={0} transitionDuration={1000}>
            <div className='main'>
                <FadeIn delay={500} transitionDuration={700}>
                    <h1 className='header'>Registration</h1>
                </FadeIn>
                <FadeIn delay={600} transitionDuration={700}>
                    <ThemeProvider theme={mainTheme}>
                        <TextField error={errorEmail} helperText={errorEmail ? "Enter email" : null} required color='primary' id='outlined-email' label="Email" variant='outlined' type={"email"}/>
                    </ThemeProvider>
                </FadeIn>
                <FadeIn delay={700} transitionDuration={700}>
                    <ThemeProvider theme={mainTheme}>
                        <TextField error={errorUsername} helperText={errorUsername ? "Enter username" : null} required color="primary" id="outlined-username" label="Username" variant="outlined"></TextField>
                    </ThemeProvider>
                </FadeIn>
                <FadeIn delay={800} transitionDuration={700}>
                    <ThemeProvider theme={mainTheme}>
                        <TextField error={errorPassword} helperText={errorPassword ? "Enter password" : null} required color='primary' id="outlined-password" label="Password" variant="outlined" type={"password"}></TextField>
                    </ThemeProvider>
                </FadeIn>
                <FadeIn delay={900} transitionDuration={700}>
                    <ThemeProvider theme={mainTheme}>
                        <TextField error={errorRepeatPassword} helperText={errorRepeatPassword ? "Repeat Password" : null} required color='primary' id='outlined-repeat' label="Repeat password" variant='outlined' type={"password"}/>
                    </ThemeProvider>
                </FadeIn>
                <FadeIn delay={1000} transitionDuration={700}>
                    <ThemeProvider theme={mainTheme}>
                        <Button sx={{borderRadius:"5vh", borderWidth: "0.01px", borderColor:"black", color:"black", backgroundColor:"#334756"}}  variant="outlined" onClick={registerUser}>Register</Button>
                    </ThemeProvider>
                </FadeIn>
                <FadeIn delay={800} transitionDuration={700}>
                    <ThemeProvider theme={mainTheme}>
                        <Button sx={{borderRadius:"5vh", borderWidth: "0.01px", borderColor:"black", color:"black", backgroundColor:"#334756"}}  variant="outlined" onClick={() => navigate('/login')}>Login</Button>
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
                            <TextField onChange={handleVerificationChange} error={errorVerificationCode} helperText={errorVerificationCode ? "Invalid Verification Code" : null} id='outlined-verification' label='Verification Code' required color='primary'/>
                        </div>
                    </Backdrop>
                </ThemeProvider>
            </div>
        </FadeIn>
    </div>
    );
}

export default RegistrationForm;