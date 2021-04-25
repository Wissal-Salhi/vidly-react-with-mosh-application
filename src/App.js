import React, { Component } from 'react';
import {ToastContainer} from "react-toastify";
import NavBar from './components/navBar';
import {Route, Switch,Redirect} from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Movies from './components/movies';
import NotFound from './components/notFound';   
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';
import ProtectedRoute from './components/comon/ProtectedRoute';
import auth from './services/authServise';
import "react-toastify/dist/ReactToastify.css";
import './App.css';



class App extends Component {
  state = {  };

  componentDidMount() {
    const user= auth.getCurrentUser();
    this.setState({user});
  }

  render() {
    const {user} = this.state; 
    return (
      <React.Fragment>
        <ToastContainer/>
        <NavBar user={this.state.user}/>
      <main className="container">         
       <Switch>
        <ProtectedRoute path="/movies/new" component={MovieForm} /> 
        <Route path="/register" component={RegisterForm}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/logout" component={Logout}/>
        <ProtectedRoute path="/movies/:id" component={MovieForm}/>
        <Route path="/movies" 
         render={props => <Movies {...props} user={this.state.user}/>}></Route>
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/movies"></Redirect>
        <Redirect to="/not-found"/>
        </Switch>
     </main>
     </React.Fragment>
   ); 
  }
}
 


export default App;
