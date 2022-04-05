import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Button, Fade, TextField, Backdrop, Collapse, Alert, Slide } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import mainTheme from '../Themes/mainTheme';
import FadeIn from 'react-fade-in/lib/FadeIn';
import UserService from '../Service/UserService';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import './RegistrationFormStyles.css';


function RegistrationForm(){
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorRepeatPassword, setErrorRepeatPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorVerificationCode, setErrorVerificationCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [backgroundStyle, setBackgroundStyle] = useState({backgroundColor:"#334756"});
    const [resendDisable, setResendDisable] = useState(false);
    const [usernameErrorMSG, setUsernameErrorMSG] = useState("Invalid username");
    const [emailErrorMSG, setEmailErrorMSG] = useState("Invalid email");
    const [toggleAlert, setToggleAlert] = useState(false);
    const navigate = useNavigate();

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
    

    const handleVerificationChange = async () => {
        const username = document.getElementById('outlined-username').value;
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

    const registerUser = async () => {
        const email = document.getElementById('outlined-email').value;
        const username = document.getElementById('outlined-username').value;
        const password = document.getElementById('outlined-password').value;
        const repeatPassword = document.getElementById('outlined-repeat').value;
        console.trace(validator.isEmail(email));
        if(email === '' || !validator.isEmail(email)){
            setEmailErrorMSG("Invalid Email");
            setErrorEmail(true);
        }
        else setErrorEmail(false);
        if(username === '' || !validator.isAlphanumeric(username) || username.length < 5){ 
            setErrorUsername("Invalid username")
            setErrorUsername(true);
        }
        else setErrorUsername(false);
        if(password === '' || !validator.isAlphanumeric(password) || password.length < 7) setErrorPassword(true);
        else setErrorPassword(false);
        if(repeatPassword === '' || password !== repeatPassword) setErrorRepeatPassword(true);
        else setErrorRepeatPassword(false);
        if(email === '' || username === '' || password === '' || repeatPassword === '' || repeatPassword !== password || password.length < 7 || username.length < 5) return;
        setLoading(true);
        let validUsername;
        let validEmail;
        await UserService.checkEmail(email).then(result => validEmail = result.data).catch((error) => console.log(error));
        await UserService.checkUsername(username).then(result => validUsername = result.data).catch((error) => console.log(error));
        if(!validUsername){
            setUsernameErrorMSG("Username already taken");
            setErrorUsername(true);
            setLoading(false);
            return;
        }
        if(!validEmail){
            setEmailErrorMSG("Email already registered");
            setErrorEmail(true);
            setLoading(false);
            return;
        }
        let result;
        await UserService.registerUser(username, password, email).then((response) => result = response.data).catch((reason) => console.log(reason));
        setLoading(false);
        if(result){
            UserService.sendVerificationCode(username);
            setOpenBackdrop(true);
            setToggleAlert(true);
            setTimeout(() => {
                setToggleAlert(false);
            }, 4000)
        }
    }


    return(
    <div>
        <Slide in={toggleAlert} direction={"down"}>
            <Alert severity='success' sx={{backgroundColor:"#334756", color:"black"}}>
                You are registered! Enter the code recieved by email!
            </Alert>
        </Slide>
        <FadeIn delay={0} transitionDuration={1000}>
            <div className='main'>
                <FadeIn delay={500} transitionDuration={700}>
                    <h1 className='header'>Registration</h1>
                </FadeIn>
                <FadeIn delay={600} transitionDuration={700}>
                    <ThemeProvider theme={mainTheme}>
                        <TextField error={errorEmail}  helperText={errorEmail ? emailErrorMSG : null} required color='primary' id='outlined-email' label="Email" variant='outlined' type={"email"}/>
                    </ThemeProvider>
                </FadeIn>
                <FadeIn delay={700} transitionDuration={700}>
                    <ThemeProvider theme={mainTheme}>
                        <TextField error={errorUsername} helperText={errorUsername ? usernameErrorMSG : null} required color="primary" id="outlined-username" label="Username" variant="outlined"></TextField>
                    </ThemeProvider>
                </FadeIn>
                <FadeIn delay={800} transitionDuration={700}>
                    <ThemeProvider theme={mainTheme}>
                        <TextField error={errorPassword} helperText={errorPassword ? "Invalid password" : null} required color='primary' id="outlined-password" label="Password" variant="outlined" type={"password"}></TextField>
                    </ThemeProvider>
                </FadeIn>
                <FadeIn delay={900} transitionDuration={700}>
                    <ThemeProvider theme={mainTheme}>
                        <TextField error={errorRepeatPassword} helperText={errorRepeatPassword ? "Passwords don't match" : null} required color='primary' id='outlined-repeat' label="Repeat password" variant='outlined' type={"password"}/>
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
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                            open={openBackdrop}
                            >
                            <div className='main-backdrop'>
                                <h2 className="header" style={{color:"black"}}>Enter verification code</h2>
                                <div style={{display:"flex", width:"fit-content", height:"fit-content"}}>
                                    <TextField onChange={handleVerificationChange} error={errorVerificationCode} helperText={errorVerificationCode ? "Invalid Verification Code" : null} id='outlined-verification' label='Verification Code' required color='primary'/>
                                    <Button disabled={resendDisable} onClick={handleResendClick} sx={[{borderRadius:"5vh", borderWidth: "0.01px", borderColor:"black", marginLeft:"5%", color:"black" }, backgroundStyle]} ><img src={require('../assets/resend.png')} alt="image not found"/></Button>
                                </div>
                            </div>
                    </Backdrop>
                </ThemeProvider>
            </div>
        </FadeIn>
    </div>
    );
}

export default RegistrationForm;