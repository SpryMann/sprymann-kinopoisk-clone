import { createStore } from 'redux';

const initialState = {
  showDetails: false,
  currentRow: null,
  currentPosterIndex: null,
  movieDetailsId: null,
  movieVideoSrc: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_HIDE_DETAILS':
      return { ...state, showDetails: action.payload };
    case 'CHANGE_CURRENT_ROW':
      return { ...state, currentRow: action.payload };
    case 'CHANGE_POSTER_INDEX':
      return { ...state, currentPosterIndex: action.payload };
    case 'CHANGE_MOVIE_DETAILS_ID':
      return { ...state, movieDetailsId: action.payload };
    case 'CHANGE_MOVIE_VIDEO_SRC':
      return { ...state, movieVideoSrc: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
