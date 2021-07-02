import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link, useParams } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    textDirection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    },
    title: {
      flexGrow: 1,
      fontSize: 20,
      fontFamily: 'Times New Roman, Times, serif',
      fontWeight: 'bold',
    },
    fontStyle:{
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
        marginTop: 25,
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 10.0,
        textAlign: 'center'
    },
    avatarStyle: {
        backgroundColor: "#000066",
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    avatarDirection: {
        display: 'flex',
        justifyContent: 'center'
    }
  }),
)

function ShowStudent(){
    const classes = useStyles();
    let { id } = useParams();
    const [student, setStudent] = useState([]);
    const [mount, setMount] = useState(true);
    const [avatar, setAvatar] = useState('');

    const StudentHandler = async () => {
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
                setStudent(specificStudent.data);
                setAvatar(specificStudent.data.firstname[0])
            } catch (e){
             console.log('Record not found');
            }
    }

    useEffect( () => {
        if (mount) {
            StudentHandler();
        }
        return () => setMount(false);
    }, [student])
    // console.log(student.firstname[0]);
    return (
    <div>
        <AppBar className={classes.appBarColor} position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    STUDENT
                </Typography>
                <Button color="inherit"><Link to="/" className={classes.backButtonColor}>Back</Link></Button>
            </Toolbar>
        </AppBar>
        <div className={classes.avatarDirection}>
            <Avatar className={classes.avatarStyle}>{avatar}</Avatar>
        </div>
            <Paper elevation={2} className={classes.paperStyle}>
                <Typography variant="h6" className={classes.fontStyle}>
                    Firstname: {student.firstname}
                </Typography>
            </Paper>
            <Paper elevation={2} className={classes.paperStyle}>
                <Typography variant="h6" className={classes.fontStyle}>
                    Lastname: {student.lastname}
                </Typography>
            </Paper>
            <Paper elevation={2} className={classes.paperStyle}>
                <Typography variant="h6" className={classes.fontStyle}>
                    Designation: {student.designation}
                </Typography>
            </Paper>
            <Paper elevation={2} className={classes.paperStyle}>
                <Typography variant="h6" className={classes.fontStyle}>
                    City: {student.city}
                </Typography>
            </Paper>
            <Paper elevation={2} className={classes.paperStyle}>
                <Typography variant="h6" className={classes.fontStyle}>
                    Country: {student.country}
                </Typography>
            </Paper>
    </div>
    );
}

export default ShowStudent;