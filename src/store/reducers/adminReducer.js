import actionTypes from '../actions/actionTypes';



const initContentOfConfirmModal = {
    
}

const initialState = {
   isLoading : false,
    gender : [],
   position : [],
   roleId : [],
   users : [],
   topDoctors : [],
   allDoctors : [],
   allTime : [],
   allRequiredDoctorInfor : []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state}
            copyState.isLoading = true
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            return {
                ...state,
                gender : action.data,
                isLoading : false
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log(action.data)
            return {
                ...state,
                isLoading : false
            }
        case actionTypes.FETCH_POSITION_SUCCESS: 
            return {
                ...state,
                position : action.data,
            }
        case actionTypes.FETCH_POSITION_FAILED: 
            return {
                ...state,
            } 
        case actionTypes.FETCH_ROLEID_SUCCESS:
            return {
                ...state,
                roleId : action.data,
            }
        case actionTypes.FETCH_ROLEID_FAILED: 
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILED: 
            state.users = []
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctor
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED: 
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDoctor
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = [] 
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS:
            state.allTime = action.data
            console.log(action.data)
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allTime = [] 
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:

            state.allRequiredDoctorInfor = [] 
            return {
                ...state,
            }   
        default:
            return state;
    }
}

export default adminReducer;