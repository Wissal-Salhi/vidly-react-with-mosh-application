import React from 'react';

//const ListGroup = (props) => {
//    const {items, textProperty, valueProperty, onItemSelect, selectedItem}=props;
// this is the same as the one below

const ListGroup = ({items, textProperty, valueProperty, onItemSelect, selectedItem}) => {
    return(  
    <ul className="list-group">
        {items.map (item =>
              <li 
              onClick={() => onItemSelect(item)} 
              key={item[valueProperty]} 
              className={(item === selectedItem )? "list-group-item list-group-item-info": "list-group-item"}>
                  {item[textProperty]}</li>
              )}     
    </ul>);
}

ListGroup.defaultProps ={
    textProperty: "name",
    valueProperty: "_id"
};
 
export default ListGroup;