
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label } from 'reactstrap';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  return (
    <div>
        <div>
            <h3>Giriş Yap</h3>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <form style={{width: '25rem'}}>
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
                <Button color='primary' onClick={(e) => {
                    e.preventDefault();
                    const body = {
                        username: username,
                        password: password
                    };
                    axios.post("/login", body)
                        .then(res => res.data)
                        .then(function (data) {
                            
                            window.sessionStorage.setItem("sessionUsername", data.username);
                            window.sessionStorage.setItem("logged_in", data.logged_in);
                            navigate("/");
                        })
                        .catch(err => alert(err))
                }}>Giriş Yap</Button> 
            </form>
        </div>
    </div>
    
  )
}

export default Login