import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../utils/Service/api';
import { DataContext } from '../Context/DataProvider';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 200,
    display: 'flex',
    margin: 'auto',
    // padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #1976D2;
    color: #fff;
    height: 48px;
    border-radius: 2px;

`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');
    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);
    const imageURL = 'https://images.unsplash.com/photo-1688382139135-950a4e886ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80';
    useEffect(() => {
        showError(false);
    }, [login])
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }
    
    const [isLoading, setLoading] = useState(0);
    const notify = () => toast.error("Wrong login Credentials");
    const loginUser = async () => {
        let response = await API.userLogin(login);
        // console.log(response); 
        setLoading(1);
        if (response.isSuccess) {
            showError('');
            setLoading(0);
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });  
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            // console.log(isLoading);
            notify(); 
            setLoading(0);
            console.log("There is an error");
            showError('Something went wrong! please try again later');
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    return (
        <Box className="mt-5">
            <ToastContainer/>       
            {
              
                <Component>
                    <>
                
                        {
                            account === 'login' ?
                                <Wrapper>
                               
                                    <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                                    <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />

                                    {error && <Error>{error}</Error>}

                                        <LoginButton variant="contained" onClick={() => loginUser()}
                                       
                                         >Login</LoginButton>
                                    <Text style={{ textAlign: 'center' }}>OR</Text>
                                    <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                                </Wrapper> :
                                <Wrapper>
                                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Email' />
                                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />

                                    <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                                    <Text style={{ textAlign: 'center' }}>OR</Text>
                                    <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                                </Wrapper>
                        }
                    </>
                </Component>
                
               
            }  
        </Box>
    );
}

export default Login;