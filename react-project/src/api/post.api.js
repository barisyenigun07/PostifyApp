import axios from "axios"

const token = localStorage.getItem("token");

export const createPost = async (data) => {
    return await axios.post("/post", data, {headers: {Authorization: `Bearer ${token}`}})
                      .then(res => res.data)
                      .catch(err => {throw err});
}

export const getPost = async (id) => {
    return await axios.get(`/post/${id}`)
                      .then(res => res.data)
                      .catch(err => {throw err});
}

export const getPostsFromUser = async (userId) => {
    return await axios.get(`/post/user/${userId}`)
                      .then(res => res.data)
                      .catch(err => {throw err});
}

export const deletePost = async (id) => {
    return await axios.delete(`/post/${id}`, {headers: {Authorization: `Bearer ${token}`}})
                      .then(res => res.data)
                      .catch(err => {throw err});
}