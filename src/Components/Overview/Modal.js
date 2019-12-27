import React from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const Container = styled(Box)({
    width: "400px",
    background: "#fff",
    display: "flex",
    margin: "10px",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "8px",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.75) 15px 13px 19px -19px",
    '& > img': {
        width: "100%",
        borderRadius: "8px 8px 0 0"
    },
    '& > div':{
        padding: "15px",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: 'Open Sans',
        '& span': {
            color: "#f50057",
            fontWeight: "bold",
            textDecoration: "underline"
        }
    },
    '& > button':{
        background: "#fff",
        padding: "0",
        position: "absolute",
        border: "none",
        right: "2px",
        top: "2px",
        fontSize: "22px",
        borderRadius: "100%",
        cursor: "pointer",
        width: "25px",
        height: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        outline: "none",
        '& > span':{
            transform: "rotate(135deg)",
        }
    }
});

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    }
}));

export const UserModal = ({user, onClose}) => {
    const classes = useStyles();
    const {fullName, picture, email, birthday, address} = user;
    return (
        <Modal open disableEnforceFocus disableAutoFocus className={classes.modal}>
            <Container>
                <button onClick={e => onClose(e)}><span>+</span></button>
                <img src={picture}/>
                <div>
                    <p><span>Full name:</span> {fullName}</p>
                    <p><span>Birthday:</span> {moment(birthday).format('LL')}</p>
                    <p><span>Email:</span> {email}</p>
                    <p><span>Address:</span> {address}</p>
                </div>
            </Container>
        </Modal>
    )
}