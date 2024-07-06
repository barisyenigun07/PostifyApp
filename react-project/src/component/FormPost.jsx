import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Input } from 'reactstrap';
import { createPost } from '../api/post.api';

const FormPost = () => {
  const [content, setContent] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const body = {
      content: content
    }

    try {
      const response = await createPost(body);
      if (response.message === "Post başarıyla paylaşıldı") {
        window.location.reload();
      }
    }
    catch (err) {

    }
  }

  return (
      <form style={{border: '1px solid', borderRadius: '5px', padding: '15px', margin: '15px', width: "66%"}} onSubmit={handleCreatePost}>
          <Input placeholder='Bir şey yazın...' name='content' type='textarea' onChange={(e) => {
              e.preventDefault();
              setContent(e.target.value);
          }}/> <br/>
          <Button color='primary' type="submit">Gönder</Button>
      </form>
  )
}

export default FormPost