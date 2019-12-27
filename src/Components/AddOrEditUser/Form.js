import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import * as actions from '../../store/actions/index';
import {isValidEmail, checkImageURL} from '../../shared/utility';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import CancelPresentationTwoToneIcon from '@material-ui/icons/CancelPresentationTwoTone';

const Container = styled(Box)({
    fontFamily: 'Open Sans',
    '& > form': {
        width: "500px",
        padding: "30px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        maxWidth: "100%",
        background: "#fff",
        borderRadius: "8px",
        '& > div': {
            marginBottom: "15px",
            position: "relative",
            '&:first-child':{
                minHeight: "300px",
            },
            '& > img': {
                width: "100%",
            },
            '& > svg': {
                position: "absolute",
                right: "3px",
                bottom: "8px",
                cursor: "pointer"
            },
            '& > p': {
                color: "#f44336"
            }
        },
        '& > #wrapper':{
            display: "flex",
            justifyContent: "space-around"
        },
    }
    
});

const defaultImage = "https://www.spectrummetals.com.au/wp-content/plugins/all-in-one-seo-pack-pro/images/default-user-image.png";

class UserForm extends Component{

    state = {
        id: "",
        fullName: "",
        birthday: moment().format("YYYY-MM-DD"),
        address: "",
        email: "",
        picture: defaultImage,
        fullName_err: false,
        birthday_err: false,
        address_err: false,
        email_err: false,
        picture_err: false,
        showPictureField: false
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        const currentUser = this.props.users.find(user => user.id === id);
        if(currentUser){
            this.setState({...currentUser, birthday: moment(currentUser.birthday).format("YYYY-MM-DD")})
        }
    }

    onChange(id, value){
        this.setState({...this.state, [id]: value, [`${id}_err`]: false})
    }

    isValidForm(){
        let isValid = true;
        const updatedState = {};
        const mandatoryFields = ["fullName", "address", "email", "birthday", "picture"];
        mandatoryFields.forEach(field => {
            if(this.state[field] === ""){
                updatedState[`${field}_err`] = "Required field";
                isValid = isValid && false;
            }
        })
        if(this.state.email !== "" && !isValidEmail(this.state.email)){
            updatedState.email_err = "Invalid email";
            isValid = false;
        }
        if(this.state.picture !== "" && !checkImageURL(this.state.picture)){
            updatedState.picture_err = "Invalid image URL";
            isValid = isValid && false;
        }
        this.setState({...this.state, ...updatedState});
        return isValid;
    }

    onSubmit(){
        if(this.isValidForm()){
            const {fullName, id, birthday, email, address, picture} = this.state;
            this.props.setUser({
                ...(id ? {id} : {}),
                fullName,
                birthday,
                email,
                address,
                picture
            });
            this.props.history.push("/");
        }
    }

    onClickDelete(){
        this.props.deleteUser(this.state.id);
        this.props.history.push("/");
    }

    togglePictureField(flag){
        this.setState({...this.state, showPictureField: flag})
    }

    render(){
        return (
          <Container>
            <Button variant="contained" color="secondary" onClick={() => this.props.history.push("/")}>Back</Button>
            <form>
                <div>
                    <img src={this.state.picture}/>
                    {
                        this.state.showPictureField 
                        ? <CancelPresentationTwoToneIcon color="secondary" onClick={() => this.togglePictureField(false)}/>
                        : <EditTwoToneIcon color="secondary" onClick={() => this.togglePictureField(true)}/>
                    }
                    {this.state.picture_err && <p>Missing profile picture</p>}
                </div>
                {
                    this.state.showPictureField && 
                    <TextField 
                        error={!!this.state.picture_err}
                        id="outlined-basic" 
                        label="Picture" 
                        {...(this.state.picture_err ? {helperText: this.state.picture_err} : {} )}
                        InputProps={{
                            onChange: (e) => this.onChange(e.target.id, e.target.value),
                            id: "picture",
                            value: this.state.picture
                    }}/>
                }
                <TextField 
                    error={!!this.state.fullName_err}
                    id="outlined-basic" 
                    label="Full name" 
                    {...(this.state.fullName_err ? {helperText: this.state.fullName_err} : {} )}
                    InputProps={{
                        onChange: (e) => this.onChange(e.target.id, e.target.value),
                        id: "fullName",
                        value: this.state.fullName
                    }}/>
                <TextField
                    error={!!this.state.birthday_err}
                    id="outlined-basic" 
                    label="Birthday"
                    type="date"
                    {...(this.state.birthday_err ? {helperText: this.state.birthday_err} : {} )}
                    InputProps={{
                        onChange: (e) => this.onChange(e.target.id, e.target.value),
                        id: "birthday",
                        value: this.state.birthday,
                        inputProps: { max: moment().format("YYYY-MM-DD")}
                    }}/>
                <TextField
                    error={!!this.state.address_err}
                    id="outlined-basic" 
                    label="Address"
                    {...(this.state.address_err ? {helperText: this.state.address_err} : {} )}
                    InputProps={{
                        onChange: (e) => this.onChange(e.target.id, e.target.value),
                        id: "address",
                        value: this.state.address
                }}/>
                <TextField
                    error={!!this.state.email_err}
                    id="outlined-basic" 
                    label="Email"
                    {...(this.state.email_err ? {helperText: this.state.email_err} : {} )}
                    InputProps={{
                        onChange: (e) => this.onChange(e.target.id, e.target.value),
                        id: "email",
                        value: this.state.email
                }}/>
                <div id="wrapper">
                    {!!this.state.id && <Button variant="contained" color="secondary" onClick={() => this.onClickDelete()}>Delete</Button>}
                    <Button variant="contained" color="secondary" onClick={() => this.onSubmit()}>{!!this.state.id ? "Update" : "Add"}</Button>
                </div>
            </form>
          </Container>
        )
    }
}

const mapStateToProps = ({app}) => ({ 
    users: app.users,
    currentUser: app.currentUser
});

const mapDispatchToProps = dispatch => ({ 
    setUser: (user) => dispatch(actions.setUser(user)),
    deleteUser: id => dispatch(actions.deleteUser(id))
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserForm));