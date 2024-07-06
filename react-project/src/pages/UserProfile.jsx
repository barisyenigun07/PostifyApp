import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../api/user.api';
import { getPostsFromUser } from '../api/post.api';
import Post from '../component/Post';

const UserProfile = () => {
  const { id } = useParams();
  
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const getUserApi = async () => {
    try {
        const userApi = await getUser(id);
        setUser(userApi);
    }
    catch (err) {
        console.error(err);
    }
  }

  const getUserPostsApi = async () => {
    try {
        const userPostsApi = await getPostsFromUser(id);
        setUserPosts(userPostsApi);
    }
    catch (err) {
        console.error(err);
    }
  }

  useEffect(() => {
    getUserApi();
    getUserPostsApi();
  }, [])

  return (
    <div>
        <p>{user?.username}'in gönderileri</p>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            {userPosts.map((userPost) => {
                return (
                    <Post content={userPost?.content} date={userPost?.date} user={userPost?.user}/>
                )
            })}
        </div>
    </div>
  )
}

export default UserProfile