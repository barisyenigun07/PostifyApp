import axios from 'axios';
import React, { useState } from 'react'
import { Button, Input } from 'reactstrap';

const FormPost = () => {
    const [content, setContent] = useState("");
  return (
    <div style={{border: '1px solid', borderRadius: '5px', padding: '5px', margin: '10px'}}>
        <Input placeholder='Bir şey yazın...' name='content' type='textarea' onChange={(e) => {
            e.preventDefault();
            setContent(e.target.value);
        }}/> <br/>
        <Button color='primary' onClick={(e) => {
            e.preventDefault();
            const body = {
                content: content
            }
            axios.post("/post",body)
                 .catch(err => alert(err));
        }}>Gönder</Button>
    </div>
  )
}

export default FormPost