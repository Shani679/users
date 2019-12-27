import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        backgroundColor: props => props.isSuccess ? "#e7fcf7" : "#fdeaea",
        color: props => props.isSuccess ? "#10bfa0" : "#d42525",
        padding: "15px 16px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: "330px",
        margin: "15px auto 0",
        justifyContent: "center",
        borderRadius: "4px",
        boxSizing: "border-box"
    },
});

export const Tooltip = (props) => {
    const { container } = useStyles(props);
    return (
        <div className={container}>
            {props.message}
        </div>
    )
}