import './App.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import AppRoute from './route';

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
    },
    table: {
      minWidth: 600,
    },
    tableHead: {
      backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    }
  }),
);

function App() {
  
  return (
    <div>
      <AppRoute />
    </div>
  );
}

export default App;
