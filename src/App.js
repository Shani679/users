import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Overview from './Components/Overview/Overview';
import Form from './Components/AddOrEditUser/Form';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
      backgroundColor: "rgb(90, 87, 87)",
      padding: "30px",
      minHeight: "100vh",
      boxSizing: "border-box",
      ['@media (max-width:768px)']:{
          padding: "20px"
      },
  },
});

const App = (props) => {
  const { container } = useStyles(props);
  return (
    <div className={container}>
      <Switch>
        <Route path="/user/:id" component={() => <Form/>}/>
        <Route path="/user" component={() => <Form/>}/>
        <Route path="/" exact component={() => <Overview/>}/>
      </Switch>
    </div>
  );
}

export default App;
