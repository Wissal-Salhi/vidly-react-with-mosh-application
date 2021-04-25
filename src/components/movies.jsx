import React, { Component } from 'react';
import {deleteMovie, getMovies} from "../services/movieService";
import Pagination from "./pagination";
import {paginate} from '../utils/paginate';
import { getGenres } from '../services/genreService';
import ListGroup from './comon/listGroup'
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {toast} from "react-toastify";
import SearchBox from './searchBox';


    class Movies extends Component {
        state = {
            movies : [],
            genres : [],
            selectedGenre: null,
            currentPage : 1,
            searchQuery:"",
            selectedGenre: null,
            pageSize:4,
            sortColumn : { path : "title", order: "asc"}
          };

        async componentDidMount(){
          const { data} = await getGenres();
          const genres  = [{name : "All Genres", _id: ''},...data]
          const {data:movies} = await getMovies();
          this.setState({movies , genres});
        };

        handleDelete = async id => {
             const originalMovies = this.state.movies;
             const movies = originalMovies.filter(movie => movie._id !== id);
             this.setState({movies});
         try {
             await deleteMovie(id);
         } catch (ex) {
            if (ex.response && ex.response.status === 404)
                 toast.error("this movie has already been deleted.");
            this.setState({movies: originalMovies});
         }
            };

        handleLike = (m) => {
          const movies=[...this.state.movies];
          const index = movies.indexOf(m);
          movies[index].liked= !movies[index].liked;
          this.setState({movies})

        };

        handlePageChange = page => {
          this.setState({currentPage : page});
        }

        handleGenreSelect = genre => {
          this.setState({selectedGenre : genre, searchQuery:"",currentPage:1});
        }

        handleSearch = query => {
          this.setState({searchQuery: query , selectedGenre:null, currentPage:1});
        }

        handleSort = sortColumn => {
          this.setState({sortColumn});
        }
        
       getPagedData = () => {
        const {pageSize, currentPage, selectedGenre, sortColumn, searchQuery}= this.state;
         
         let filtered=this.state.movies;
         if (searchQuery)
          filtered=this.state.movies.filter(m=>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase()) );
        else if (selectedGenre && selectedGenre._id )
         filtered=this.state.movies.filter(m => m.genre._id === selectedGenre._id) ;
        
         const sorted=_.orderBy(filtered, [sortColumn.path], [sortColumn.order])
         const movies = paginate(sorted, currentPage, pageSize);
         return { totaCount : filtered.length, data:movies}
       };


        render() { 
          const {pageSize, currentPage, selectedGenre}= this.state;
            
          const {totaCount, data:movies} = this.getPagedData(); 
          const {user} = this.props;

          return (
            <div>
               {(this.state.movies.length === 0 ) ?
                   <div>
                     <Link className="btn btn-primary m-2" to="/movies/new">New Movie</Link>
                     <h2>There are no movies in the databases. </h2> 
                   </div>
                   :
                <div>
                  <div className="row">
                   <div className="col-3">
                    <ListGroup 
                      items={this.state.genres} 
                      onItemSelect={this.handleGenreSelect} 
                      selectedItem={selectedGenre}
                     />
                    </div>
                    <div className="col">
                      {user && (
                        <Link 
                        className="btn btn-primary m-2" 
                        to="/movies/new">
                          New Movie
                      </Link>
                      ) }
                      
                      <h2>Showing {totaCount} in the Data</h2>
                      <SearchBox value={this.state.searchQuery} onChange={this.handleSearch}/>
                       <MoviesTable 
                         movies={movies} 
                         sortColumn={this.state.sortColumn}
                         onDelete={this.handleDelete}
                         onLike={this.handleLike}
                         onSort={this.handleSort}/>
              
                       <Pagination 
                         itemsCount={totaCount} 
                         pageSize={pageSize} 
                         currentPage={currentPage}
                         onPageChange={this.handlePageChange} />
                     </div>
                  </div >
                </div>
                   }
            </div>
          );

    
                   

        }
    }
     
    export default Movies;
    