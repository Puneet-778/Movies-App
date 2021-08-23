import React, {Component} from 'react';
// import { getMovies } from './getMovies';
import axios from 'axios';

export default class Movies extends Component{
    constructor(){
        super();
        this.state={movies:[],
        searchText:'',
        currPage:1,
        limit:4,
        genreList:[{_id: "default", name: "All Genre"}],
        cGenre:'All Genre'};
    }

   async componentDidMount(){
        // side effects->network request 
        console.log('Component did mount');
        let req = await axios.get('https://backend-react-movie.herokuapp.com/movies');
        let genreRes = await axios.get('https://backend-react-movie.herokuapp.com/genres');
        console.log(genreRes.data)
        console.log(req.data);
        this.setState({movies:req.data.movies, genreList:[...this.state.genreList, ...genreRes.data.genres]})
    }

    delete = (id)=> {
        let temp = this.state.movies.filter(function(movieObj){
            return movieObj._id !== id;
        });

        this.setState({movies:temp});
    }

    handleInput = (e)=>{
        this.setState({searchText:e.target.value})
    }

    handlePageChange = (pageNumber) => {
        this.setState({currPage:pageNumber})
    }

    handleLimit = (e)=> {
        this.setState({limit:e.target.value});
    }

    handleGenre = (genreObj)=>{
        this.setState({cGenre:genreObj.name})
    }

    sortByStock = (e) =>{
        let className = e.target.className;
        // movies.js:26 fas fa-caret-up
        let temp = this.state.movies;
        if(className === "fas fa-caret-up"){     
           temp.sort(function(a, b){
               return a.numberInStock - b.numberInStock;
           });
        }else if(className === "fas fa-caret-down"){
            temp.sort(function(a, b){
                return b.numberInStock - a.numberInStock;
            });
        }
    
        this.setState({movies:temp});
    }

    sortByDailyRental = (e) =>{
        let className = e.target.className;
        // movies.js:26 fas fa-caret-up
        let temp = this.state.movies;
        if(className === "fas fa-caret-up"){     
           temp.sort(function(a, b){
               return a.dailyRentalRate - b.dailyRentalRate;
           });
        }else if(className === "fas fa-caret-down"){
            temp.sort(function(a, b){
                return b.dailyRentalRate - a.dailyRentalRate;
            });
        }
    
        this.setState({movies:temp});
    }

    render(){
        console.log("render");
        let inputText = this.state.searchText;
        let genreArr = this.state.genreList;
        let limit = this.state.limit;
        let cGenre = this.state.cGenre;

        let filterArr = this.state.movies.filter(function(movieObj){
            return movieObj.title.toLowerCase().includes(inputText.toLowerCase());
        });

        if(cGenre !== 'All Genre'){
            filterArr = filterArr.filter(function(movieObj){
                return movieObj.genre.name === cGenre
            })
        }


        let si = (this.state.currPage-1)*limit;
        let ei = si+limit-1;

        let totalPages = Math.ceil(filterArr.length/limit);

        filterArr = filterArr.slice(si, ei+1);
        if(filterArr.length === 0 && this.state.currPage !== 1){
            this.setState({currPage:totalPages})
        }

        let pageArr = [];
        for(let i = 1;i<= totalPages;i++){
            pageArr.push(i);
        }
        return (
          <>
            {this.state.movies.length === 0 ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="container">
                <div className="row">
                  <div className="col-3">
                    <ul class="list-group">
                      {genreArr.map((genreObj) => {
                        return (
                          <li
                            key={genreObj._id}
                            onClick={() => {
                              this.handleGenre(genreObj);
                            }}
                            className="list-group-item"
                          >
                            {genreObj.name}
                          </li>
                        );
                      })}
                    </ul>
                    <div>Current Genre {this.state.cGenre}</div>
                  </div>
                  <div className="col-9">
                    <input
                      type="search"
                      value={this.state.searchText}
                      onChange={this.handleInput}
                    ></input>
                    <input
                      type="number"
                      min="1"
                      value={this.state.limit}
                      onChange={this.handleLimit}
                    ></input>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Title</th>
                          <th scope="col"> Genre</th>
                          <th scope="col">
                            <i
                              className="fas fa-caret-up"
                              onClick={this.sortByStock}
                            ></i>
                            Stock
                            <i
                              className="fas fa-caret-down"
                              onClick={this.sortByStock}
                            ></i>
                          </th>
                          <th scope="col">
                            <i
                              className="fas fa-caret-up"
                              onClick={this.sortByDailyRental}
                            ></i>
                            dailyRentalRate
                            <i
                              className="fas fa-caret-down"
                              onClick={this.sortByDailyRental}
                            ></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterArr.map((movieObj) => {
                          return (
                            <tr key={movieObj._id}>
                              <td></td>
                              <td>{movieObj.title}</td>
                              <td>{movieObj.genre.name}</td>
                              <td>{movieObj.numberInStock}</td>
                              <td>{movieObj.dailyRentalRate}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    this.delete(movieObj._id);
                                  }}
                                  type="button"
                                  className="btn btn-danger"
                                >
                                  Danger
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <nav aria-label="...">
                      <ul className="pagination">
                        {pageArr.map((pageNumber) => {
                          let classStyle =
                            pageNumber === this.state.currPage
                              ? "page-item active"
                              : "page-item";
                          return (
                            <li
                              key={pageNumber}
                              onClick={() => {
                                this.handlePageChange(pageNumber);
                              }}
                              className={classStyle}
                            >
                              <a className="page-link" >{pageNumber} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        );
    }
}


// ---------Page-------------------
{/* <li className="page-item"><a class="page-link" href="#">1</a></li>
<li className="page-item active" aria-current="page">
  <a className="page-link" href="#">2</a>
</li>
<li className="page-item"><a class="page-link" href="#">3</a></li> */}
