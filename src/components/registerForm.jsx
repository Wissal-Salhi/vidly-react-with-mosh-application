import React from 'react';
import Form from "./comon/form";
import Joi from 'joi-browser';
import {register} from '../services/userServise'; 
import auth from '../services/authServise'; //importing an object



class RegisterForm  extends Form {
    state = {
        data : {
            email :'',
            password : '',
            name : ''
        },
        errors : {}
    }

    schema = {
        email : Joi.string().email().required().label("Email"),
        password : Joi.string().min(5).required().label('Password'),
        name : Joi.string().required().label("Username")
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors : errors || {}});
        this.doSubmit();
        
   };

   doSubmit = async () => {
    try {
    const response =  await register(this.state.data);
    auth.loginWithJwt(response.headers['x-auth-token']);
    window.location='/';
    } catch (ex) {
       if (ex.response && ex.response.status === 400 ) {
        const errors={...this.state.errors};
        errors.email = ex.response.data;
        this.setState({errors});
       }
    } 
   }

    render() { 
        return ( 
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                 {this.renderInput("email","Email")}
                 {this.renderInput("password","Password","password")}
                 {this.renderInput("name","Name")}
                 {this.renderButton("Register")}
                </form>
            </div>
         );
    }
}
 
export default RegisterForm ;