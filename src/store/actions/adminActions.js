import actionTypes from './actionTypes';
import userService from '../../services/userService';
import { toast } from "react-toastify";


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch,getState) => {
        try {
            dispatch({
                type : actionTypes.FETCH_GENDER_START
            })            
            let res = await userService.getAllCodeService('GENDER');
          
            if(res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart ',e)
        }
    }
}

export const fetchPositionStart = () => {
    return async (dispatch,getState) => {
        try {          
            let res = await userService.getAllCodeService('position');
            if(res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionStart ',e)
        }
    }
}

export const fetchRoleStart = () => {
    return async (dispatch,getState) => {
        try {           
            let res = await userService.getAllCodeService('role');
            if(res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log('fetchRoleFailed ',e)
        }
    }
}

export const fetchAllTime = () => {
    return async (dispatch,getState) => {
        try {           
            let res = await userService.getAllCodeService('TIME');
            if(res && res.errCode === 0) {
                dispatch(fetchAllTimeSuccess(res.data))
            }else{
                dispatch(fetchAllTimeFailed())
            }
        } catch (e) {
            dispatch(fetchAllTimeFailed())
            console.log('fetchAllTimeFailed ',e)
        }
    }
}

export const fetchAllTimeSuccess = (time) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
    data : time
})

export const fetchAllTimeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED,
})


export const fetchGenderSuccess = (gederData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data : gederData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data : positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLEID_SUCCESS,
    data : roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLEID_FAILED
})


export const createNewUser = (data) => {
    return async (dispatch,getState) => {
        try {           
            let res = await userService.createNewUserService(data);
            console.log('Check create new User', res)
            if(res && res.errCode === 0) {
                toast.success("Create new user success");
                console.log('check ákjdlkasjdlkjasd')
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart()) // cách 2 
            }else{
                toast.error("Người dùng này tồn tại");
                console.log(res)
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('saveUserFailed',e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.SAVE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED
})


export const fetchAllUsersStart = () => {
    return async (dispatch,getState) => {
        try {           
            let res = await userService.getAllUser('ALL');
            if(res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }else{
                dispatch(fetchAllUsersFailed())
            }
        } catch (e) {
            toast.error("Mất kết nối server");
            dispatch(fetchAllUsersFailed())
            console.log('fetchAllUsersFailed ',e)
        }
    }
}

export const fetchAllUsersSuccess = (data)=>( {
    type : actionTypes.FETCH_ALL_USERS_SUCCESS,
    users : data
})

export const fetchAllUsersFailed = ()=>( {
    type : actionTypes.FETCH_ALL_USERS_FAILED,
})


export const deleteAUser = (id) => {
    return async (dispatch,getState) => {
        try {           
            let res = await userService.deleteUserService(id);
            if(res && res.errCode === 0) {
                toast.success("Delete user success");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart()) 
            }else{
                toast.error("Delete failded");
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            toast.error("deleteUserFailed");
            dispatch(deleteUserFailed())
            console.log('deleteUserFailed',e)
        }
    }
}


export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const editAUser = (user) => {
    return async (dispatch,getState) => {
        try {
            console.log(user)
            let res = await userService.editUserService(user);
            console.log(res)
            if(res && res.errCode === 0) {
                toast.success("Update user success");
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart()) 
            }else{
                toast.error("Lỗi");
                dispatch(editUserFailed())
            }
        } catch (e) {
            toast.error("EditUserFailed");
            dispatch(editUserFailed())
            console.log('EditUserFailed',e)
        }
    }
}


export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})


// 
export const fetchTopDoctop = () => {
    return async (dispatch,getState) => {
        try {
            let res = await userService.getTopDoctorHomeService('10');
            if(res && res.errCode === 0){
                dispatch({
                    type : actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor : res.data // Lấy các doctor
                })
                // dispatch(fetchAllUsersStart()) // cách 2 
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED', e)
            dispatch({
                type : actionTypes.FETCH_TOP_DOCTOR_FAILED,
            })
        }
    }
}

export const fetchAllDoctop = () => {
    return async (dispatch,getState) => {
        try {
            let res = await userService.getAllDoctors();
            if(res && res.errCode === 0){
                dispatch({
                    type : actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDoctor : res.data // Lấy các all doctor
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAILED', e)
            dispatch({
                type : actionTypes.FETCH_ALL_DOCTOR_FAILED,
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch,getState) => {
        try {
            let res = await userService.saveDetailDoctorService(data);
            if(res && res.errCode === 0){
                toast.success("save new info success");
                dispatch({
                    type : actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS
                })
            }else{
                toast.error("save new info failed");
                dispatch({
                    type : actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('SAVE_DETAIL_DOCTOR_FAILED', e)
            toast.error("save new info failed");
            dispatch({
                type : actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}


export const getRequiredDoctorInfor = () => {
    return async (dispatch,getState) => {
        try {
            // dispatch({
            //     type : actionTypes.FETCH_GENDER_START
            // })            
            let resPrice = await userService.getAllCodeService('PRICE');
            let resPayment = await userService.getAllCodeService('PAYMENT');
            let resProvince = await userService.getAllCodeService('PROVINCE');
            let resSpecialty = await userService.getAllSpecialty()
            let resClinic = await userService.getAllClinic()
          
            if  (
                    resPrice && resPrice.errCode === 0
                    && resPayment && resPayment.errCode === 0
                    && resProvince && resProvince.errCode === 0 
                    && resSpecialty && resSpecialty.errCode === 0
                    && resClinic && resClinic.errCode === 0
            ) {

                let data = {
                    resPrice : resPrice.data,
                    resPayment : resPayment.data,
                    resProvince : resProvince.data,
                    resSpecialty : resSpecialty.data,
                    resClinic : resClinic.data
                }
                dispatch(fetchRequireddoctorInforSuccess(data))
            }else{
                dispatch(fetchRequireddoctorInforSuccess())
            }
        } catch (e) {
            dispatch(fetchRequireddoctorInforFailed())
            console.log('fetchRequireddoctorInforFailed ',e)
        }
    }
}

export const fetchRequireddoctorInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data : data
})

export const fetchRequireddoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
})