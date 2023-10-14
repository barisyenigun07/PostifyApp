import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FormPost from '../component/FormPost';
import Post from '../component/Post';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get("/post")
            .then(res => setPosts(res.data))
    }, [])
  return (
    <div>
        <FormPost/>
        {(posts.length === 0) ? <p>Herhangi bir post paylaşılmadı</p> : posts.map(
            (post) => <Post content={post.content} date={post.date} user={post.user}/>
        )}
    </div>
  )
}

export default Feed