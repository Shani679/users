import * as actionTypes from "./actionTypes";
import axios from 'axios';

export const getRandomUser = () => {
    return dispatch => {
        dispatch(setLoader(true));
        axios.get("https://randomuser.me/api/").then(({status, data}) => {
            if(status === 200){
                dispatch(getRandomUserSuccess(data.results));
                dispatch(setTooltip({show: true, isSuccess: true, message: "A random user was added successfully"}));
            }
        }).catch(err => {
            dispatch(setLoader(false));
            dispatch(setTooltip({show: true, isSuccess: false, message: "Something went wrong... try again later."}))
        })
    }
   
}

const getRandomUserSuccess = users => ({
    type: actionTypes.GET_RANDOM_USER_SUCCESS,
    users
});
  

export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        user
    }
}

export const deleteUser = id => {
    return {
        type: actionTypes.DELETE_USER,
        id
    }
}

const setLoader = flag => {
    return {
        type: actionTypes.SET_LOADER,
        flag
    }
}

export const setTooltip = tooltip => {
    return {
        type: actionTypes.SET_TOOLTIP,
        tooltip
    }
}