import React, {Component} from 'react';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {UserModal} from './Modal';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import FullscreenSharpIcon from '@material-ui/icons/FullscreenSharp';
import {withRouter} from 'react-router-dom';

const Container = styled(Box)({
    display: "flex",
    margin: "10px",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "250px",
    borderRadius: "3px",
    position: "relative",
    maxWidth: "100%",
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 7.68px 0.32px, rgba(0, 0, 0, 0.4) 0px 12px 26px 0px",
    ['@media (max-width:768px)']:{
        width: "100%",
        margin: "10px 0"
    },
    '&:hover > svg':{
        display: "initial"
    },
    '& > img': {
        width: "100%"
    },
    '& > div':{
        padding: "15px",
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "#fff",
        '& > p': {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
    },
    '& > svg': {
        position: "absolute",
        right: "0",
        cursor: "pointer",
        display: "none",
        '&:nth-child(2)': {
            top: "25px"
        }
    }
});

class User  extends Component{

    state = {
        openModal: false
    }
    
    toggleModal(e, flag){
        e.stopPropagation();
        this.setState({openModal: flag})
    }

    onClickEdit(e){
        this.props.history.push(`user/${this.props.user.id}`);
    }

    render(){
        const {fullName, picture, email} = this.props.user;
        return (
            <Container>
                <EditTwoToneIcon color="secondary" onClick={e => this.onClickEdit(e)}/>
                <FullscreenSharpIcon color="secondary" onClick={e => this.toggleModal(e, true)}/>
                <img src={picture}/>
                <div>
                    <p>{fullName}</p>
                    <p>{email}</p>
                </div>
                {this.state.openModal && <UserModal user={this.props.user} onClose={e => this.toggleModal(e, false)}/>}
            </Container>
        )
    }
}


export default withRouter(User);