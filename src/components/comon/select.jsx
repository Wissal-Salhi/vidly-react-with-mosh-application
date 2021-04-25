import React from 'react';


const Select = ({name,label,options,error,...rest}) => {
    return ( 
        <div className="form-group">
                        <label htmlFor={name}>{label}</label>
                        <select {...rest}
                               id={name} 
                               name={name}
                               className="form-control">
                        
                                   {options.map(option => 
                                    <option key={option._id} value={option._id}>
                                        {option.name}
                                    </option>)}
                        </select>                               
                        {error && <div className="alert alert-danger">{error}</div>}
                    </div>
     );
}
 
export default Select;