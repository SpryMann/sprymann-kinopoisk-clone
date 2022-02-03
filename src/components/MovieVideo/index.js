import React from 'react';
import './MovieVideo.css';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';

const MovieVideo = () => {
  const dispatch = useDispatch();
  const movieVideoSrc = useSelector((state) => state.movieVideoSrc);

  return (
    <div
      className={movieVideoSrc ? 'movieVideo movieVideo--active' : 'movieVideo'}
    >
      <ReactPlayer
        className="movieVideo__player"
        url={movieVideoSrc}
        controls={true}
      />
      <button
        className="movieVideo__close"
        onClick={() =>
          dispatch({ type: 'CHANGE_MOVIE_VIDEO_SRC', payload: null })
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    </div>
  );
};

export default MovieVideo;
