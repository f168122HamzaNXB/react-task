import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontSize: 20,
      fontFamily: 'Times New Roman, Times, serif',
      fontWeight: 'bold',
    },
    table: {
      minWidth: 600,
    },
    tableHead: {
      backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    inputMargin: {
        marginTop: 30,
        marginLeft: 20,
        width: '90%'
    },
    paperStyle:{
        width: '50%',
        margin: 50,
        borderRadius: 20.0
    },
    backButtonColor: {
      margin: 10,
      color: 'black',
      fontWeight: 'bold',
      fontSize: 18,
      fontFamily: 'Times New Roman, Times, serif',
      textDecoration: 'none'
    },
    appBarColor: {
      color: 'black',
      backgroundColor: '#9999ff'
    }, 
    buttonStyle: {
      margin: 20,
      color: 'white',
      fontSize: 18,
      fontFamily: 'Times New Roman, Times, serif',
      backgroundColor: '#000066',
      width: '50%',
      borderRadius: 5.0
    }
  }),
);

function CreatStudent(){
    const classes = useStyles();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [designation, setDesignation] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const Create = async () => {
        console.log(firstname+','+lastname+','+email+','+password+','+designation+','+city+','+country);
        return fetch('http://localhost:8080/createstudents', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                hashPassword: password,
                designation: designation,
                city: city,
                country: country,
            })
        }).then((response) => {
          if (response.headers.get('content-type').match(/application\/json/)){
            return response.json();
          }
          return response;
        })
        .then((json) => {
          console.log(json);
          return json;
        }).catch((error) => {
          console.error(error);
        });
    }

    return (
    <div>
        <AppBar className={classes.appBarColor} position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    CREATE STUDENT
                </Typography>
                <Button color="inherit"><Link to="/" className={classes.backButtonColor}>Back</Link></Button>
            </Toolbar>
        </AppBar>
        <Paper className={classes.paperStyle} elevation={2} square >
            <form className={classes.root} noValidate autoComplete="off">
                <Input 
                className={classes.inputMargin} 
                placeholder="Firstname" 
                inputProps={{ 'aria-label': 'description' }} 
                onChange={fname => setFirstName(fname.target.value)}
                value={firstname}
                /><br/>
                <Input 
                className={classes.inputMargin} 
                placeholder="Lastname" 
                inputProps={{ 'aria-label': 'description' }} 
                onChange={lname => setLastName(lname.target.value)}
                 value={lastname}
                /><br/>

                <Input 
                className={classes.inputMargin} 
                placeholder="Email" 
                inputProps={{ 'aria-label': 'description' }} 
                onChange={email => setEmail(email.target.value)}
                 value={email}
                /><br/>

                <Input 
                className={classes.inputMargin} 
                placeholder="Password" 
                inputProps={{ 'aria-label': 'description' }} 
                onChange={password => setPassword(password.target.value)}
                 value={password}
                /><br/>

                <Input
                 className={classes.inputMargin} 
                 placeholder="Designation" 
                 inputProps={{ 'aria-label': 'description' }}
                 onChange={desig => setDesignation(desig.target.value)}
                 value={designation} 
                 /><br/>
                <Input 
                className={classes.inputMargin} 
                placeholder="City" 
                inputProps={{ 'aria-label': 'description' }} 
                onChange={city => setCity(city.target.value)}
                value={city}
                /><br/>
                <Input 
                className={classes.inputMargin}
                placeholder="Country" 
                inputProps={{ 'aria-label': 'description' }}
                onChange={country => setCountry(country.target.value)}
                value={country}
                /><br/>
                <Button 
                className={classes.buttonStyle} onClick={Create}>Submit</Button>
            </form>
        </Paper>
    </div>
    );
}

export default CreatStudent;