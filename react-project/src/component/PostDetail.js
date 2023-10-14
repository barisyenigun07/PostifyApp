import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  
  useEffect(() => {
    axios.get(`/post/${id}`)
         .then(res => setPost(res.data))
         .catch(err => alert(err))
  }, [id]);
  return (
    <div>
        {post.content}
    </div>
  )
}

export default PostDetail