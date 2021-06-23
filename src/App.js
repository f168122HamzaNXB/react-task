import './App.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AllStudent from './allstudents';
import EditStudent from './editstudent';
import CreateStudent from './createstudent';
import ShowStudent from './showstudent';

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
      <Router>
        <Switch>
          <Route exact path="/" component={AllStudent} >
          </Route>
          <Route exact path="/editstudent/:id" component={EditStudent} >
          </Route>
          <Route exact path="/createstudent" component={CreateStudent} >
          </Route>
          <Route exact path="/showstudent/:id" component={ShowStudent} >
          </Route>
          {/* <Route exact path="/showstudent" component={ShowStudent} >
          </Route> */}
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
