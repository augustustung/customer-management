import './App.css';
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddUser from './pages/AddUser'
import EditUser from './pages/EditUser'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/add" component={AddUser}/>
          <Route exact path="/edit/:id" component={EditUser}/>
        </Switch>
    </div>
  );
}


export default App;
