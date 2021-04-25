import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = { 
        data : {},
        errors : {}
     }

     validate = () => {
        const options =  {abortEarly : false}; 
        const {error} =Joi.validate(this.state.data , this.schema ,options);
        if (!error) return null;
        const errors = {};
        for (let item of error.details) errors[item.path[0]]=item.message;
        return errors;        
    }

    validateProperty = ({name, value})=> {
        const obj ={[name] : value};
        const schema = {[name]: this.schema[name]};
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
       
    }

    handleChange =({ currentTarget : input}) => { //here we are renaming (destructering)  e.currentTarget to input
        const errors = {...this.setState.errors};
        const errorMsg = this.validateProperty(input); 
        // input.name = currentTarger.name = username or password  
        if (errorMsg) errors[input.name]=errorMsg;
        else delete errors[input.name];
  
        const data = {...this.state.data};
        data[input.name]= input.value;
        this.setState({data, errors});
      }

    renderButton(label) {
        return <button disabled={this.validate()} className="btn btn-primary">{label}</button> ;

    }

    renderSelect (name,label,options) {
        const {data,errors} = this.state;
        return <Select
          name={name} 
          label={label}
          value={data[name]} 
          onChange={this.handleChange} 
          error={errors[name]}
          options={options}
          />;
    }
    
   
    renderInput(name,label,type) {
        const {data,errors} = this.state;
        return <Input 
          name={name} 
          label={label}
          value={data[name]} 
          onChange={this.handleChange} 
          error={errors[name]}
          type={type}
          />;
    }

 
}
 
export default Form;