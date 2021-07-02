import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
  useHistory,
  Link
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    
    title: {
      flexGrow: 1,
      fontSize: 20,
      fontFamily: 'Times New Roman, Times, serif',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    
    inputMargin: {
        marginTop: 10,
        marginLeft: 20,
        width: '90%',
        height: 30,
        borderRadius: 4.0,
        border: 'none',
        BorderBottom: '2px solid red'
    },

    errorStyle: {
        marginTop: 5,
        marginLeft: 20,
        width: '90%',
        color: 'red'
    },

    paperSize:{
        width: '50%',
    },

    buttonStyle: {
      margin: 20,
      color: 'white',
      fontSize: 18,
      height: 30,
      border: 'none',
      fontFamily: 'Times New Roman, Times, serif',
      backgroundColor: '#000066',
      width: '25%',
      borderRadius: 5.0
    },

    paperStyle:{
      width: '100%',
      margin: 50,
      borderRadius: 20.0,
      backgroundColor: '#b3c6ff'
    },

    labelStyle: {
      marginTop: 20,
      paddingBottom: 0,
      marginLeft: 20,
      fontSize: 18,
      fontFamily: 'Times New Roman, Times, serif',
    },

    newStudentButton: {
      margin: 10,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
      fontFamily: 'Times New Roman, Times, serif',
      textDecoration: 'none'
    }, 

  }),
);


function Login() {
    const { register, handleSubmit, getValues, formState: {errors} } = useForm();
    const classes = useStyles();
    let history = useHistory();

    const onSubmit = async (data, e) => {
      console.log(data.email+','+data.password);
      return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
              email: data.email,
              hashPassword: data.password,
          })
      }).then((response) => {
        if (response.headers.get('content-type').match(/application\/json/)){
          return response.json();
        }
        return response;
      })
      .then((json) => {
        console.log(json);
        localStorage.setItem('token', json.token);
        if(localStorage.getItem('token')){
          history.push("/all");
        }
        return json;
      }).catch((error) => {
        console.error(error);
      });
    }
    return (
      <div>
        <AppBar className={classes.appBarColor} position="static">
         <Toolbar>
            <Typography variant="h6" className={classes.title}>
                STUDENT PORTAL
            </Typography>
            {/*  */}
            <Button color="inherit"><Link to="/createstudent" className={classes.newStudentButton}>REGISTER</Link></Button>
         </Toolbar>
        </AppBar>
      <Grid container spacing={3} direction="column" alignItems="center" justify="center">
        <Grid item xs={12}>
          <Paper className={classes.paperStyle} elevation={2} square>
            <form>
                <Typography variant="h6" className={classes.title}>
                    LOGIN FORM
                </Typography>
                <label className={classes.labelStyle} htmlFor="email">Email:</label><br/>
                <input className={classes.inputMargin} {...register("email", { required: "This is require",
                 pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,  
                  message: "Invalid email" } 
                  })}/><br/><br/><br/>
                {errors.email && <p className={classes.errorStyle}>{errors.email.message}</p>}
                <label className={classes.labelStyle} htmlFor="password">Password:</label>
                <input className={classes.inputMargin} {...register("password", { required: "This is required", maxLength: 20 })} />
                {errors.password && <p className={classes.errorStyle}>{errors.password.message}</p>}
                <input className={classes.buttonStyle} onClick={handleSubmit(onSubmit)} type="submit" name="Login"/>
            </form>
          </Paper>
        </Grid>
      </Grid>
      </div>
    );
}

export default Login;