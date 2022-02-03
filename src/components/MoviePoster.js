import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const baseUrl = 'https://image.tmdb.org/t/p/original';

const MoviePoster = ({
  id,
  source,
  rating,
  topRated,
  ratePlace,
  genres,
  genre,
}) => {
  const dispatch = useDispatch();
  const currentRow = useSelector((state) => state.currentRow);
  const movieDetailsId = useSelector((state) => state.movieDetailsId);

  const handleClick = (event) => {
    dispatch({ type: 'CHANGE_MOVIE_DETAILS_ID', payload: id });
    if (currentRow) {
      currentRow
        .querySelectorAll('.row__poster')
        .forEach((poster) => poster.classList.remove('row__poster--active'));
    }
    dispatch({
      type: 'CHANGE_CURRENT_ROW',
      payload: event.target.closest('.row'),
    });
    dispatch({ type: 'SHOW_HIDE_DETAILS', payload: true });
  };

  if (topRated) {
    return (
      <div
        className={
          movieDetailsId === id
            ? 'row__poster row__poster--active'
            : 'row__poster'
        }
        onClick={(e) => handleClick(e)}
      >
        <span className="row__ratePlace">{ratePlace}</span>
        <img className="row__image" src={baseUrl + source} alt="Movie poster" />
      </div>
    );
  } else if (genres) {
    return (
      <div className="row__poster">
        <h3 className="row__genre">{genre}</h3>
      </div>
    );
  } else {
    return (
      <div
        className={
          movieDetailsId === id
            ? 'row__poster row__poster--active'
            : 'row__poster'
        }
        onClick={(e) => handleClick(e)}
      >
        <img className="row__image" src={baseUrl + source} alt="Movie poster" />
        {rating !== 0 && (
          <span
            className="row__rating"
            style={{
              backgroundColor:
                (rating <= 5 && 'red') || (rating <= 7 && 'gray'),
            }}
          >
            {rating}
          </span>
        )}
      </div>
    );
  }
};

export default MoviePoster;
