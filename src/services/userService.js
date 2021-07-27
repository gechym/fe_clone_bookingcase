import axios from "../axios";

const handleLoginApi = async (email, password) => {
    return  await axios.post('api/login',{email,password})
}

const getAllUser = async (id) => {
    let data = await axios.get(`/api/get-all-user?id=${id}`);
    // console.log(data)
    return data
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user',data)
}

const deleteUserService = (userId) =>{
    return axios.delete('/api/delete',{data:{id : userId}})
}

const editUserService = (data) => {
    return axios.put('/api/edit-user',data)
}
     
export default {
    handleLoginApi,
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
}