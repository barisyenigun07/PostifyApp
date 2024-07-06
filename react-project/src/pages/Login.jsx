
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label } from 'reactstrap';
import { userLogin } from '../redux/authActions';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };

        dispatch(userLogin(data))
            .unwrap()
            .then(() => {
                navigate("/");
                window.location.reload();
            })
            .catch((err) => {
                console.error(err);
            })
    }
  return (
    <div>
        <div>
            <h3>Giriş Yap</h3>
        </div>
        
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <form onSubmit={handleLogin} style={{width: '25rem'}}>
                <Label htmlFor='uname' style={{display: 'flex', justifyContent: 'left'}}>Kullanıcı Adı</Label>
                <Input id='uname' type='text' name='username' onChange={(e) => {
                    e.preventDefault();
                    setUsername(e.target.value);
                }}/> <br/>
                <Label htmlFor='pwd' style={{display: 'flex', justifyContent: 'left'}}>Şifre</Label>
                <Input id='pwd' type='password' name='password' onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                }}/> <br/>
                <Button 
                    color='primary'
                    type='submit'
                >
                    Giriş Yap
                </Button> 
            </form>
        </div>
    </div>
    
  )
}

export default Login