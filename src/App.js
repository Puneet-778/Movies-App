import './App.css';
import Movies from './Components/movies';
import Home from './Components/Home';
import About from './Components/About';
import Nav from './Components/navbar';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"

function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
         <Route exact path="/" component={Home}/>
         <Route path="/movies" component={Movies}/>
         <Route path="/about" render = {(props)=>{
           return <About {...props} name="Puneet" isAuth={true}/>
         }}/>
      </Switch>
    </Router>
    
  );
}

export default App;
