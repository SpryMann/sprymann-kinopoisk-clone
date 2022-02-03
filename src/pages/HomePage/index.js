import React from 'react';
import './HomePage.css';
import Navbar from '../../components/Navbar';
import Banner from '../../components/Banner';
import Row from '../../components/Row';
import MovieVideo from '../../components/MovieVideo';
import { requests } from '../../http/requests';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const movieVideoSrc = useSelector((state) => state.movieVideoSrc);

  return (
    <>
      <Navbar />
      <Banner />
      <Row title={'Популярные'} fetchUrl={requests.popularMovies} />
      <Row
        title={'Популярные за все время'}
        fetchUrl={requests.topRatedMovies}
        topRated={true}
      />
      <Row title={'Скоро в кино'} fetchUrl={requests.upcomingMovies} />
      <Row title={'Жанры'} fetchUrl={requests.genresList} genres={true} />
      <Row title={'Сейчас смотрят'} fetchUrl={requests.nowPlayingMovies} />
      {movieVideoSrc && <MovieVideo />}
    </>
  );
};

export default HomePage;
