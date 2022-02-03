import React, { useState, useRef, useEffect } from 'react';
import './Row.css';
import MoviePoster from '../MoviePoster';
import MovieDetail from '../MovieDetail';
import { $host } from './../../http';

const Row = ({ title, fetchUrl, topRated = false, genres = false }) => {
  const [isShowLeftArrow, setIsShowLeftArrow] = useState(true);
  const [isShowRightArrow, setIsShowRightArrow] = useState(true);
  const [movies, setMovies] = useState([]);
  const rowInner = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (genres) {
        const response = await $host.get(fetchUrl);
        setMovies(response.data.genres);
        return;
      }

      const { data } = await $host.get(fetchUrl);
      setMovies(data.results.slice(0, 10));
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleScrolling();
  }, [rowInner]);

  const handleScrolling = () => {
    if (rowInner.current.scrollLeft === 0) {
      setIsShowLeftArrow(false);
      setIsShowRightArrow(true);
    } else if (
      rowInner.current.scrollLeft + rowInner.current.offsetWidth ===
      rowInner.current.scrollWidth
    ) {
      setIsShowLeftArrow(true);
      setIsShowRightArrow(false);
    } else {
      setIsShowLeftArrow(true);
      setIsShowRightArrow(true);
    }
  };

  return (
    <div
      className={`row${topRated ? ' row--topRated' : ''}${
        genres ? ' row--genres' : ''
      }`}
    >
      <h3 className="row__title">{title}</h3>
      <div className="row__posters">
        <div
          className={
            isShowLeftArrow
              ? 'row__arrow row__arrow--left'
              : 'row__arrow row__arrow--left row__arrow--hide'
          }
          onClick={() => {
            rowInner.current.scrollLeft -= 1000;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
        </div>
        <div
          className="row__inner"
          ref={rowInner}
          onScroll={() => handleScrolling()}
        >
          {movies.map((poster, index) => {
            if (
              (topRated && poster.poster_path) ||
              poster.backdrop_path ||
              genres
            ) {
              return (
                <MoviePoster
                  key={poster.id}
                  id={poster.id}
                  source={
                    (topRated && poster.poster_path) ||
                    (genres && '') ||
                    poster.backdrop_path
                  }
                  rating={poster.vote_average}
                  topRated={topRated}
                  ratePlace={index + 1}
                  genres={genres}
                  genre={genres && poster.name}
                />
              );
            }
          })}
        </div>
        <div
          className={
            isShowRightArrow
              ? 'row__arrow row__arrow--right'
              : 'row__arrow row__arrow--right row__arrow--hide'
          }
          onClick={() => (rowInner.current.scrollLeft += 1000)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
        </div>
      </div>
      <MovieDetail />
    </div>
  );
};

export default Row;
