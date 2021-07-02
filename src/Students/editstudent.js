import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
    paperSize:{
        width: '50%',
    },
    backButtonColor: {
      margin: 10,
      color: 'black',
      fontWeight: 'bold',
      fontSize: 18,
      fontFamily: 'Times New Roman, Times, serif',
      textDecoration: 'none'
    },
    buttonStyle: {
      margin: 20,
      color: 'white',
      fontSize: 18,
      fontFamily: 'Times New Roman, Times, serif',
      backgroundColor: '#000066',
      width: '50%',
      borderRadius: 5.0
    },
    appBarColor: {
      color: 'black',
      backgroundColor: '#9999ff'
    }, 
    paperStyle:{
      width: '50%',
      margin: 50,
      borderRadius: 20.0
    },
  }),
);

function EditStudent(){
    const classes = useStyles();
    let { id } = useParams();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState(0);
    const [designation, setDesignation] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [mount, setMount] = useState(true);

    const getStudent = async () => {
        console.log(id);
        try{
            const token = localStorage.getItem('token');
            let response = await fetch('http://localhost:8080/student/' + id, {
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer '+token
                }, 
                });
                const specificStudent = await response.json();
                setFirstName(specificStudent.data.firstname);
                setLastName(specificStudent.data.lastname);
                console.log(specificStudent.data.lastname);
                setDesignation(specificStudent.data.designation);
                setCity(specificStudent.data.city);
                setCountry(specificStudent.data.country);
            } catch (e){
             console.log('Record not found');
            }
    }

    const updateStudent = async () => {
        console.log(firstname+','+lastname+','+designation+','+city+','+country+','+id);
        try{
            let response = await fetch('http://localhost:8080/student/' + id, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }, 
                  body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    designation: designation,
                    city: city,
                    country: country,
                  })
                });
                const data = response.json();
                console.log(data);
        } catch (e){
            console.log('Record not found');  
        }
    }

    useEffect( () => {
        if (mount) {
            getStudent();
        }
        return () => setMount(false);
    }, [])

    return (
        <div>
        <AppBar className={classes.appBarColor} position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    UPDATE STUDENT
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
                className={classes.buttonStyle} 
                color="inherit" onClick={updateStudent}>Update</Button>
            </form>
        </Paper>
        </div>
    );
}

export default EditStudent;