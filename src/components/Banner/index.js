import React, { useState, useEffect } from 'react';
import { $host } from '../../http';
import { requests } from '../../http/requests';
import './Banner.css';

const baseUrl = 'https://image.tmdb.org/t/p/original';

const Banner = () => {
  const [wishMovie, setWishMovie] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await $host.get(requests.nowPlayingMovies);
      setMovie(
        data.results[Math.floor(Math.random() * (data.results.length - 1))]
      );
    };

    fetchData();
  }, []);

  return (
    <div
      className="banner"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${baseUrl}${movie?.backdrop_path})`,
      }}
    >
      <div className="banner__content">
        <div className="banner__text">
          <h1 className="banner__title">{movie.title}</h1>
          <h2 className="banner__description">{movie.overview}</h2>
        </div>
        <div className="banner__bottom">
          <button className="banner__button banner__button--watch">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
            Смотреть фильм
          </button>
          <button className="banner__button">Трейлер</button>
          <button
            className={
              wishMovie
                ? 'banner__button banner__button--bookmark'
                : 'banner__button'
            }
            onClick={() => setWishMovie(!wishMovie)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
            </svg>
          </button>
          <button className="banner__button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
