import axios from "axios"

export const register = async (data) => {
    await axios.post("/register", data)
                .catch(err => {throw err});
}

export const login = async (data) => {
    return await axios.post("/login", data)
                        .then(res => res.data)
                        .catch(err => {throw err});
}