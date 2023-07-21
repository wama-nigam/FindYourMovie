import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorite from './components/RemoveFavorite';

const App = () => {
	const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);

  const getMoviesRequest = async (searchValue)=> {
    const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=7d8fd2f8`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search){
        setMovies(responseJson.Search);
    };

  };

  useEffect(()=>{
    getMoviesRequest(searchValue);
  },[searchValue]);

  useEffect(()=>{
    const newMovie = JSON.parse(localStorage.getItem('react-movie-app-fav'));
    setFavorites(newMovie);
  },[]);

  const addFavMovie = (movie) =>{
    const newFav = [...favorites, movie ];
    setFavorites(newFav);
  };

  const remFavMovie =(movie)=>{
    const newFav = favorites.filter((favorite)=>
favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFav);
  };

  const saveToLocalStorage = (items)=>{
    localStorage.setItem('react-movie-app-fav', JSON.stringify(items))
  }

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading ="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
        
			</div>
      <div className='row '>
          <MovieList 
          movies={movies} 
          handleFav={addFavMovie}
          favComponent={AddFavorites}/>
          
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading ="Favorites"/>
        
        
			</div>
      <div className='row '>
          <MovieList movies={favorites} 
          handleFav = {remFavMovie}
          favComponent={RemoveFavorite}
          />
          
      </div>
		</div>
	);
};

export default App;