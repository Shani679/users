import React, { Component } from 'react';
import Users from './Users';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import {withRouter} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import { ClipLoader } from "react-spinners";
import { Tooltip } from './Tooltip';

const Container = styled(Box)({
    fontFamily: 'Open Sans',
    '& > #loader': {
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
        alignItems: "center",
        display:"flex",
        zIndex: "2"
    }
});

class Overview extends Component {

    componentDidUpdate(prevProps){
        if(!prevProps.tooltip.show && this.props.tooltip.show){
            setTimeout(() => this.props.setTooltip({show: false, isSuccess: true, message: ""}), 5000);
        }
    }

    render(){
        const {show, isSuccess, message} = this.props.tooltip;
        return (
            <Container>
                {
                    this.props.loading &&
                    <div id="loader">
                        <ClipLoader
                            size={150}
                            color={"#f50057"}
                        />
                    </div>
                }
                <Button variant="contained" color="secondary" onClick={() => this.props.getRandomUser()} style={{marginRight: "10px"}}>Random</Button>
                <Button variant="contained" color="secondary" onClick={() => this.props.history.push("/user")}>New</Button>
                {show && <Tooltip isSuccess={isSuccess} message={message}/>}
                <Users/>
            </Container>
        );
    }
}

const mapStateToProps = ({app}) => ({ 
    loading: app.loading,
    tooltip: app.tooltip
});

const mapDispatchToProps = dispatch => ({ 
  getRandomUser: () => dispatch(actions.getRandomUser()),
  setTooltip: tooltip => dispatch(actions.setTooltip(tooltip))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Overview));
