import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { $host } from '../../http';
import { requests } from '../../http/requests';
import './MovieDetail.css';

const baseUrl = 'https://image.tmdb.org/t/p/original';
const YTBaseUrl = 'https://www.youtube.com/watch?v=';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.showDetails);
  const currentRow = useSelector((state) => state.currentRow);
  const movieDetailsId = useSelector((state) => state.movieDetailsId);
  const currentDetails = useRef(null);
  const [content, setContent] = useState('about');
  const [data, setData] = useState({});
  const [videoSrc, setVideoSrc] = useState('');

  const handleClose = () => {
    dispatch({ type: 'SHOW_HIDE_DETAILS', payload: false });
    dispatch({ type: 'CHANGE_CURRENT_POSTER_INDEX', payload: null });
    setContent('about');
  };

  const handleShowVideo = async () => {
    dispatch({
      type: 'CHANGE_MOVIE_VIDEO_SRC',
      payload: `${YTBaseUrl}${videoSrc}`,
    });
  };

  useEffect(() => {
    if (show && currentRow.contains(currentDetails.current)) {
      const fetchData = async () => {
        const response = await $host.get(
          `${requests.movieDetails}${movieDetailsId}`
        );
        setData(response.data);

        const { data } = await $host.get(
          `${requests.movieDetails}${movieDetailsId}/videos`
        );
        data?.results[0]?.key
          ? setVideoSrc(data?.results[0]?.key)
          : setVideoSrc('');
      };

      fetchData();
    }
  }, [show, movieDetailsId, currentRow]);

  return (
    <div
      className={
        show && currentRow.contains(currentDetails.current)
          ? 'row__detail row__detail--active'
          : 'row__detail'
      }
      ref={currentDetails}
      style={{
        background: `linear-gradient(to right, #000000 35%, rgba(0, 0, 0, 0.3) 70%), url(${baseUrl}${data?.backdrop_path})`,
      }}
    >
      <div className="detail__head">
        <ul className="detail__tabs">
          <li
            className={
              content === 'about'
                ? 'detail__tab detail__tab--active'
                : 'detail__tab'
            }
            onClick={() => setContent('about')}
          >
            О фильме
          </li>
          <li
            className={
              content === 'details'
                ? 'detail__tab detail__tab--active'
                : 'detail__tab'
            }
            onClick={() => setContent('details')}
          >
            Детали
          </li>
        </ul>

        <button className="detail__close" onClick={() => handleClose()}>
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
      <div
        className={
          content === 'about'
            ? 'detail__body detail__body--top detail__body--active'
            : 'detail__body detail__body--top'
        }
      >
        <h2 className="detail__title">{data?.title}</h2>
        <div className="detail__infos">
          <span className="detail__info detail__info--rating">
            {data?.vote_average}
          </span>
          <span className="detail__info">
            {data?.vote_count && parseInt(data?.vote_count / 1000) + 'K'}
          </span>
          <span className="detail__info">
            {data?.release_date?.split('-')[0]},{' '}
            {data?.genres
              ?.slice(0, 2)
              ?.map((genre) => genre.name)
              ?.join(', ')}
          </span>
          <span className="detail__info">
            {data?.production_countries &&
              data?.production_countries[0]?.iso_3166_1}
          </span>
        </div>
        <h3 className="detail__shortDescription">{data?.overview}</h3>
        <div className="detail__bottom">
          <button
            className={
              videoSrc
                ? 'banner__button banner__button--watch'
                : 'banner__button banner__button--watch banner__button--disabled'
            }
            disabled={videoSrc ? false : true}
            onClick={() => handleShowVideo()}
          >
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
          <button
            className={
              videoSrc
                ? 'banner__button'
                : 'banner__button banner__button--disabled'
            }
            disabled={videoSrc ? false : true}
            onClick={() => handleShowVideo()}
          >
            Трейлер
          </button>
          <button className="banner__button banner__button--bookmark">
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
      <div
        className={
          content === 'details'
            ? 'detail__body detail__body--bottom detail__body--active'
            : 'detail__body detail__body--bottom'
        }
      >
        <div className="detail__left">
          <h2 className="detail__title">{data?.title}</h2>
          <span className="detail__rating">{data?.vote_average}</span>
          <span className="detail__votesCount">{data?.vote_count} оценки</span>
          <h3 className="detail__description">{data?.overview}</h3>
        </div>
        <div className="detail__right">
          <div className="detail__col">
            <div className="colList">
              <div className="colList__title">В главных ролях</div>
              <ul className="colList__items">
                <li className="colList__item">Хью Джекман</li>
                <li className="colList__item">Ребекка Фергюсон</li>
                <li className="colList__item">Тандиве Ньютон</li>
              </ul>
            </div>
            <div className="colList">
              <div className="colList__title">Режиссеры</div>
              <ul className="colList_items">
                <li className="colList__item">Лиза Джой</li>
              </ul>
            </div>
          </div>
          <div className="detail__col">
            {data?.original_title && (
              <div className="colList">
                {' '}
                <div className="colList__title">Оригинальное название</div>
                <ul className="colList__items">
                  <li className="colList__item">{data?.original_title}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
