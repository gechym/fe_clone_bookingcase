import actionTypes from './actionTypes';
import userService from '../../services/userService';

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
            fetchPositionFailed()
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
            fetchRoleFailed()
            console.log('fetchRoleStart ',e)
        }
    }
}


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
                dispatch(saveUserSuccess())
            }else{
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