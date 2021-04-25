import React from 'react';
import _ from 'lodash';   
import propTypes from 'prop-types';  


const Pagination = (props) => {
    const {itemsCount , pageSize ,onPageChange , currentPage} = props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount+1);
    return (
        <nav>
            <ul className="pagination">
                {pages.map( page => (
                     <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                         <a className="page-link" onClick={()=> onPageChange(page)} href="#">{page}</a>
                     </li>
                ))}
               
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    itemsCount: propTypes.number.isRequired,
    pageSize : propTypes.number.isRequired,
    currentPage: propTypes.number.isRequired,
    onPageChange: propTypes.func.isRequired
};
 
export default Pagination;