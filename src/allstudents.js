import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";

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
      borderRadius: 100,
      backgroundColor: 'white'
    },
    tableHead: {
      backgroundColor: '#000066',
      color: 'white',
    },
    headCell: {
      color: 'white',
      fontSize: 20,
      fontFamily: 'Times New Roman, Times, serif',
      fontWeight: 'bold',
    },
    tableMargin: {
      overflowX: 'auto',
      marginTop: 20,
      borderRadius: 10.0
    },
    tableText: {
      fontSize: 16,
      fontFamily: 'Times New Roman, Times, serif',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    newStudentButton: {
      margin: 10,
      color: 'black',
      fontWeight: 'bold',
      fontSize: 18,
      fontFamily: 'Times New Roman, Times, serif',
      textDecoration: 'none'
    }, 
    iconColor: {
      color: '#9999ff'
    },
    appBarColor: {
      color: 'black',
      backgroundColor: '#9999ff'
    }
  }),
);


function AllStudent(){
  const classes = useStyles();
  const [mount, setMount] = useState(true);
  const [students, setStudents] = useState([]);

  const deleteStudent = async (id) => {
    console.log("Delete the Row");
    console.log(id);
    try{
        let response = await fetch('http://localhost:8080/delete/' + id, {
            method: 'DELETE',
            headers: {}, 
            });
            const deleteStudent = await response.json();
            console.log(deleteStudent);
        
            response = await fetch('http://localhost:8080/students', {
              method: 'GET',
              headers: {}, 
              });
            const data = await response.json();
            setStudents(data.data);
        } catch (e){
         console.log('Record not found');
        }
  }

  useEffect( () => {
    async function getStudentData(){
        try{
            let response = await fetch('http://localhost:8080/students', {
                method: 'GET',
                headers: {}, 
                });
                const data = await response.json();
                // console.log(data);
                setStudents(data.data);
          } catch (e){
             console.log("Error Occurred in getting the students");
          }
        }
    if (mount) {
      getStudentData();
    }    
    return () => setMount(false);

}, [students]);  

    return (
    <div>
        <AppBar className={classes.appBarColor} position="static">
         <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                STUDENTS
            </Typography>
            <Button color="inherit"><Link to="/createstudent" className={classes.newStudentButton}>New Student</Link></Button>
         </Toolbar>
        </AppBar>
        <Container maxWidth="xl">
            <TableContainer className={classes.tableMargin} component={Paper}>
                <Table className={classes.table} aria-label="Student">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                      <TableCell className={classes.headCell}>Firstname</TableCell>
                      <TableCell className={classes.headCell}>Lastname</TableCell>
                      <TableCell className={classes.headCell}>Designation</TableCell>
                      <TableCell className={classes.headCell}>City</TableCell>
                      <TableCell className={classes.headCell}>Country</TableCell>
                      <TableCell className={classes.headCell}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                    <TableRow className={classes.tableRowHover} key={student._id}>
                        <TableCell className={classes.tableText}>{student.firstname}</TableCell>
                        <TableCell className={classes.tableText}>{student.lastname}</TableCell>
                        <TableCell className={classes.tableText}>{student.designation}</TableCell>
                        <TableCell className={classes.tableText}>{student.city}</TableCell>
                        <TableCell className={classes.tableText}>{student.country}</TableCell>
                        <TableCell className={classes.tableText}>
                            <Link to={`/editstudent/${student._id}`}><EditIcon className={classes.iconColor}/></Link>
                            <Link to={`/showstudent/${student._id}`}><VisibilityIcon className={classes.iconColor}/></Link>
                            <DeleteIcon 
                              onClick = {() => {
                                deleteStudent(student._id);
                              }} 
                              className={classes.iconColor}
                            />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
         </Container>
    </div>
    );
}

export default AllStudent;