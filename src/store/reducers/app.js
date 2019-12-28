import * as actionTypes from "../actions/actionTypes";
import {calculateMatch} from '../../shared/utility';
const uuidv1 = require('uuid/v1');

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
    const mappedUsers = calcUsersScroe([...users, ...state.users]);
    return {...state, users: mappedUsers, loading: false};
}

const calcUsersScroe = (users) => {
    if(users.length < 2) return users;
    return users.map(user => {
        let highestScore = 0;
        users.forEach(userToCompareWith => {
            if(user.id !== userToCompareWith.id){
                const finalScore = calculateMatch(user, userToCompareWith);
                highestScore = finalScore > highestScore ? finalScore : highestScore;
            }
        })
        return {...user, userMatch: highestScore}
    });
}

const setUser = (state, {user}) => {
    let users = [...state.users];
    const userAge = new Date().getFullYear() - Number(user.birthday.split("-")[0]);
    user = {...user, age: userAge};
    const userIndex = users.findIndex(u => u.id === user.id);
    const isUserExist = userIndex > -1;
    isUserExist ? users.splice(userIndex, 1, user) : users.unshift({...user, id: uuidv1()});
    const mappedUsers = calcUsersScroe(users);
    return {...state, users: mappedUsers};
}

const deleteUser = (state, {id}) => {
    let users = [...state.users];
    const userIndex = users.findIndex(u => u.id === id);
    users.splice(userIndex, 1);
    const mappedUsers = calcUsersScroe(users);
    return {...state, users: mappedUsers};
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