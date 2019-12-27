import React from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import User from './User';
import { connect } from 'react-redux';

const Container = styled(Box)({
    display: "flex",
    padding: "30px 0",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    fontFamily: 'Open Sans'
});


const Users = (props) => {
    const {users} = props;
    return (
        <Container>
            {!!users.length && users.map((user, i) => <User key={i} user={user}/>)}
        </Container>
    )
}

const mapStateToProps = ({app}) => ({ 
    users: app.users
});

export default connect(mapStateToProps)(Users);