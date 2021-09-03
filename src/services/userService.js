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

const getAllCodeService = (input) => {
    return axios.get(`/allcode?type=${input}`)
}

const getTopDoctorHomeService = (limit) =>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () =>{
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) =>{
    return axios.post(`/api/save-infor-doctors`, data)
}

const getDetailDoctorByIdService = (id) =>{
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}

const saveBulkScheduleDoctor = (data) =>{
    return axios.post(`/api/bulk-create-schedule`,data)
}

const getScheduleDoctorByDate = (doctorId,date) =>{
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = (doctorId) =>{
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) =>{
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) =>{
    return axios.post(`/api/patient-book-appointment`, data)
}

const postVerifyBookAppointment = (data) =>{
    return axios.post(`/api/verify-booking-appointment`, data)
}

const postNewSpecialty = (data) =>{
    return axios.post(`/api/create-new-specialty`, data)
}

const getAllSpecialty = () =>{
    return axios.get(`/api/get-all-specialty`)
}

const getDetailSpecialtyById = (id,location) =>{
    return axios.get(`/api/get-detail-specialty-by-id?id=${id}&location=${location}`)
}

const postNewClinic = (data) =>{
    return axios.post(`/api/create-new-clinic`, data)
}

const getAllClinic = () =>{
    return axios.get(`/api/get-all-clinic`)
}

const getDetailClinicById = (id) =>{
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`)
}

const getListPatientForDoctor = (id,date) => {
    return axios.get(`/api/get-list-Patinet-for-doctor?doctorId=${id}&date=${date}`)
}

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}


     
export default {
    handleLoginApi,
    getAllUser,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
    getDetailDoctorByIdService,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientBookAppointment,
    postVerifyBookAppointment,
    postNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    postNewClinic,
    getAllClinic,
    getDetailClinicById,
    getListPatientForDoctor,
    postSendRemedy
}