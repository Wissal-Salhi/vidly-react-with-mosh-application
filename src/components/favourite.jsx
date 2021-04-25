import React from 'react';
import 'font-awesome/css/font-awesome.css'; 

const Favourite = (props) => {
    let classes="fa fa-heart";
        if (!props.liked)
        classes+="-o";
        return ( <i 
            onClick={props.onClick} 
            class={classes} 
            style={ { cursor : "pointer"}}
            aria-hidden="true"></i>
        );
}
 
export default Favourite;