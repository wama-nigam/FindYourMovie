import React from 'react';

const MovieList = (props) => {
    const FavComp = props.favComponent ;
	return (
		<>
			{!props.movies?null: props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} alt='movie'></img>
                    <div onClick={()=> props.handleFav(movie)}
                    className='overlay d-flex align-items-center justify-content-center '>
                        <FavComp/>
                    </div>
				</div>
			))}
		</>
	);
};

export default MovieList;