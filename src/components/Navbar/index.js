import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import ProfileAvatar from './../../images/ariana.jpg';

const Navbar = () => {
  const [scrolledNavbar, setScrolledNavbar] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrollStartPos, setScrollStartPos] = useState(window.scrollY);
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const transitionNavbar = useCallback(() => {
    if (window.scrollY > 25) {
      setScrolledNavbar(true);
    } else {
      setScrolledNavbar(false);
    }

    if (window.scrollY > scrollStartPos && window.scrollY > 50) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }

    setScrollStartPos(window.scrollY);
  }, [scrollStartPos]);

  useEffect(() => {
    window.addEventListener('scroll', transitionNavbar);
    return () => {
      window.removeEventListener('scroll', transitionNavbar);
    };
  }, [transitionNavbar]);

  return (
    <div
      className={`navbar${scrolledNavbar ? ' navbar--scrolled' : ''}${
        !showNavbar ? ' navbar--hide' : ''
      }`}
    >
      <svg
        className="navbar__logo"
        width="164px"
        height="36px"
        viewBox="0 0 164 36"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        data-tid="ec6df9"
        onClick={() => navigate('/')}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M58.859 18c0-5.889 2.954-10.6 8.281-10.6 5.328 0 8.281 4.711 8.281 10.6 0 5.89-2.954 10.6-8.28 10.6-5.328 0-8.282-4.71-8.282-10.6Zm8.281 7.66c2.072 0 2.954-3.534 2.954-7.652 0-4.12-.889-7.652-2.954-7.652-2.065 0-2.954 3.533-2.954 7.652-.007 4.118.882 7.652 2.954 7.652ZM3.843 7.7v5.596h.294L7.98 7.7h5.32l-7.098 6.474.294.293L19.51 7.693v4.711L7.973 16.523v.292l11.537-1.028v4.419L7.973 19.178v.293l11.537 4.118v4.712L6.496 21.526l-.294.293 7.098 6.474H7.98l-3.843-5.596h-.294v5.596H0V7.686h3.843V7.7Zm19.23 0H28.1l-.294 12.363h.294L34.015 7.7h4.438v20.608h-5.026l.294-12.364h-.294L27.51 28.309h-4.438V7.7Zm23.955 0h-5.026v20.608h5.026v-9.13h4.137v9.13h5.026V7.7h-5.026v7.952h-4.137V7.7Zm45.25 0h-14.19v20.608h5.027V11.233h4.137v17.075h5.026V7.7Zm2.66 10.3c0-5.889 2.954-10.6 8.282-10.6 5.32 0 8.281 4.711 8.281 10.6 0 5.89-2.954 10.6-8.281 10.6-5.32 0-8.282-4.71-8.282-10.6Zm8.282 7.66c2.072 0 2.954-3.534 2.954-7.652 0-4.12-.889-7.652-2.954-7.652-2.072 0-2.954 3.533-2.954 7.652 0 4.118.882 7.652 2.954 7.652ZM119.187 7.7h-5.026v20.608h4.438l5.916-12.364h.294l-.294 12.364h5.026V7.7h-4.438l-5.916 12.363h-.294l.294-12.363Zm23.669 13.541 4.732.585c-.889 4.12-2.954 6.774-7.364 6.774-5.32 0-8.016-4.71-8.016-10.6 0-5.889 2.689-10.6 8.016-10.6 4.317 0 6.475 2.649 7.364 6.475l-4.732 1.177c-.294-2.063-1.155-4.71-2.632-4.71-1.771 0-2.689 3.533-2.689 7.651 0 4.09.918 7.652 2.689 7.652 1.449.015 2.33-2.341 2.632-4.404Zm11.83-13.54h-4.732v20.607h4.732v-9.13h.294l3.549 9.13H164l-5.177-10.6L163.849 7.7h-5.026l-3.843 9.13h-.294V7.7Z"
          fill="#fff"
        ></path>
      </svg>
      <ul
        className={
          isSearch ? 'navbar__menu navbar__menu--hidden' : 'navbar__menu'
        }
      >
        <li
          className={
            location.pathname === '/'
              ? 'navbar__item navbar__item--active'
              : 'navbar__item'
          }
        >
          <NavLink to="/" className="navbar__link">
            Мое кино
          </NavLink>
        </li>
        <li
          className={
            location.pathname === '/buy'
              ? 'navbar__item navbar__item--active'
              : 'navbar__item'
          }
        >
          <NavLink to="/buy" className="navbar__link">
            Магазин
          </NavLink>
        </li>
        <li
          className={
            location.pathname === '/watchlist'
              ? 'navbar__item navbar__item--active'
              : 'navbar__item'
          }
        >
          <NavLink to="/watchlist" className="navbar__link">
            Буду смотреть
          </NavLink>
        </li>
        <li
          className={
            location.pathname === '/purchases'
              ? 'navbar__item navbar__item--active'
              : 'navbar__item'
          }
        >
          <NavLink to="/purchases" className="navbar__link">
            Покупки
          </NavLink>
        </li>
        <li
          className={
            location.pathname === '/channels'
              ? 'navbar__item navbar__item--active'
              : 'navbar__item'
          }
        >
          <NavLink to="/channels" className="navbar__link">
            Телеканалы
          </NavLink>
        </li>
        <li className="navbar__item">
          <button className="navbar__link" onClick={() => setIsSearch(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </li>
      </ul>
      <div
        className={
          isSearch ? 'navbar__search' : 'navbar__search navbar__search--hidden'
        }
      >
        <input
          className="navbar__input"
          type="text"
          placeholder="Фильмы и сериалы"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="navbar__searchClose"
          onClick={() => setIsSearch(false)}
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
      <img
        className="navbar__avatar"
        src={ProfileAvatar}
        alt="User avatar"
        onClick={() => navigate('/profile')}
      />
    </div>
  );
};

export default Navbar;
