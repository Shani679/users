import * as actionTypes from "../actions/actionTypes";

const initialState = {
    users: [],
    loading: false,
    tooltip: {
        show: false,
        isSuccess:  true,
        message: ""
    }
}

const setRandomUser = (state, {users}) => {
    users = users.map(user => ({
        id: user.login.uuid,
        fullName: `${user.name.first} ${user.name.last}`,
        email: user.email,
        picture: user.picture.large,
        birthday: user.dob.date,
        age: user.dob.age,
        address: `${user.location.street.number} ${user.location.street.name} st. ${user.location.city}, ${user.location.state} ${user.location.country}`
    }))
    return {...state, users: [...users, ...state.users], loading: false};
}

const setUser = (state, {user}) => {
    let users = [...state.users];
    if(user.id){
        const userIndex = users.findIndex(u => u.id === user.id);
        users.splice(userIndex, 1, user);
        return {...state, users};
    }
    users.unshift(user);
    return {...state, users};
}

const deleteUser = (state, {id}) => {
    let users = [...state.users];
    const userIndex = users.findIndex(u => u.id === id);
    users.splice(userIndex, 1);
    return {...state, users};
}

const setLoader = (state, {flag}) => {
    return {...state, loading: flag}
}

const setTooltip = (state, {tooltip}) => {
    return {...state, tooltip: {...tooltip}}
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_RANDOM_USER_SUCCESS: return setRandomUser(state, action);
        case actionTypes.SET_USER: return setUser(state, action);
        case actionTypes.DELETE_USER: return deleteUser(state, action);
        case actionTypes.SET_LOADER: return setLoader(state, action);
        case actionTypes.SET_TOOLTIP: return setTooltip(state, action);
        default: return state;
    }
};

export default reducer;