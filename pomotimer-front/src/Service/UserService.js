import axios from 'axios';

const CheckServerURL = "http://10.1.66.19:8080/checkServer";
const RegisterURL = "http://10.1.66.19:8080/registerUser";
const CheckCodeURL = "http://10.1.66.19:8080/checkCode";
const CheckInfoURL = "http://10.1.66.19:8080/checkInfo";
const LoginUserURL = "http://10.1.66.19:8080/loginUser";
const AddPomoURL = "http://10.1.66.19:8080/addPomo";
const GetUserURL = "http://10.1.66.19:8080/getUserInfo";
const ChangeVerificationCodeURL = "http://10.1.66.19:8080/changeVerificationCode";
const SendVerificationCodeURL = "http://10.1.66.19:8080/sendVerificationCode";

class UserService{


    //Checks If server is alive
    async checkServer(){
        return await axios.get(CheckServerURL);
    }

    //Assumes user info is already checked!
    async registerUser(username, password, email){
        return await axios.put(RegisterURL, {},
            {
                params: {
                    username: username,
                    password: password,
                    email: email
                }
            });
    }

    //Checks if verificationCode is correct.
    async checkVerificationCode(username, verificationCode){
        return await axios.get(CheckCodeURL,
            {
                params: {
                    username: username,
                    verificationCode: verificationCode
                }
            });
    }

    //Checks if username and email are valid.
    async checkUsername(username, email){
        return await axios.get(CheckInfoURL,
        {
            params: {
                username: username,
                email: email
            }
        });
    }

    //Checks if user is verified and username and password are valid.
    async loginUser(username, password){
        return await axios.get(LoginUserURL, 
            {
                params:{
                    username: username,
                    password: password
                }
            });
    }

    //Adds pomodoro count to given user.
    addPomo(id){
        axios.post(AddPomoURL,
            {
                params:{
                    id: id
                }
            });
    }

    //Returns object of user by username.
    async getUserInfo(username){
        return await axios.get(GetUserURL,
            {
                params:{
                    username: username
                }
            });
    }

    //Changes email verification code.
    changeVerificationCode(username){
        axios.post(ChangeVerificationCodeURL,
            {
                params:{
                    username: username
                }
            });
    }

    sendVerificationCode(username){
        axios.post(SendVerificationCodeURL, {},
            {
                params:{
                    username: username
                }
            });
    }

}

export default new UserService();