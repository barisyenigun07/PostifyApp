import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label } from 'reactstrap';

const Register = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const registerBody = {
            name: name,
            username: username,
            email: email,
            password: password,
            confirm: confirm
        };

        axios.post("/register", registerBody)
            .then(() => {
                navigate("/login");
            })
            .catch(err => alert(err));
    }
  return (
    <div>
        <div>
            <h3>Kayıt Ol</h3>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <form style={{width: '25rem'}}>
                <Label htmlFor='nm' style={{display: 'flex', justifyContent: 'left'}}>İsim</Label>
                <Input id='nm' name='name' type='text' onChange={(e) => {
                    e.preventDefault();
                    setName(e.target.value);
                }}/> <br/>
                <Label htmlFor='uname' style={{display: 'flex', justifyContent: 'left'}}>Kullanıcı Adı</Label>
                <Input id='uname' name='username' type='text' onChange={(e) => {
                    e.preventDefault();
                    setUsername(e.target.value);
                }}/> <br/>
                <Label htmlFor='em' style={{display: 'flex', justifyContent: 'left'}}>Email</Label>
                <Input id='em' name='email' type='text' onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                }}/> <br/>
                <Label htmlFor='pwd' style={{display: 'flex', justifyContent: 'left'}}>Şifre</Label>
                <Input id='pwd' name='password' type='password' onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                }}/> <br/>
                <Label htmlFor='cnfrm' style={{display: 'flex', justifyContent: 'left'}}>Şifre Doğrula</Label>
                <Input id='cnfrm' name='confirm' type='password' onChange={(e) => {
                    e.preventDefault();
                    setConfirm(e.target.value);
                }}/> <br/>
                <Button color='primary' onClick={handleRegister}>Kayıt Ol</Button>
            </form>
        </div>
    </div>
  )
}

export default Register