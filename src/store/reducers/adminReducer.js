import actionTypes from '../actions/actionTypes';



const initContentOfConfirmModal = {
    
}

const initialState = {
   isLoading : false,
    gender : [],
   position : [],
   roleId : [],
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
        default:
            return state;
    }
}

export default adminReducer;