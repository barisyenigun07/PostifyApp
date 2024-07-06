import axios from "axios"

export const getUser = async (id) => {
    return await axios.get(`/user/${id}`)
                      .then(res => res.data)
                      .catch(err => {throw err})
}