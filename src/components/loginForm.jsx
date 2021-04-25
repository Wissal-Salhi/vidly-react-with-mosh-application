import React from 'react';
import Joi from 'joi-browser';
import Form from './comon/form';
import auth from '../services/authServise'; 

class LoginForm extends Form {
    state = {
        data : {
            username :'',
            password : ''
        },
        errors : {}
    }

    schema = {
        username : Joi.string().required().label("Username"),
        password : Joi.string().required().label('Password')
    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors : errors || {}});
        this.doSubmit();
        
   };

   doSubmit = async () => {
    try {
        await auth.login(this.state.data.username,this.state.data.password);  
        const {state} =this.props.location;
        window.location= state ? state.from.pathname : '/';

    } catch (ex) {
        if (ex.response && ex.response.status === 400 ){
            const errors = {...this.state.errors};
            errors.username= ex.response.data;
            this.setState({errors});
        }        
    }
    
   }

    render() { 
      
        return ( 
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username","Username")}
                    {this.renderInput("password","Password","password")}
                    {this.renderButton("Login")}
    
                </form>
            </div>
        );
    }
}
 
export default LoginForm;

