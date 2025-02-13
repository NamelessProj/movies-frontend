import api from './api/axiosConfig.js';
import {useEffect, useState} from "react";
import Layout from "./components/Layout.jsx";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import './App.css';
import Header from "./components/header/Header.jsx";
import Trailer from "./pages/trailer/Trailer.jsx";
import Reviews from "./pages/reviews/Reviews.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";

function App() {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);

    const getMovies = async () => {
        try{
            const response = await api.get("/movies");
            setMovies(response.data);
        }catch(err){
            console.error(err);
        }
    }

    const getMovieData = async (imdbId) => {
        try{
            const response = await api.get(`/movies/${imdbId}`);
            const singleMovie = response.data;
            setMovie(singleMovie);
            setReviews(singleMovie.reviewIds);
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);

  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home movies={movies} />} />
                <Route path="/trailer/:ytTrailerId" element={<Trailer />} />
                <Route path="/reviews/:imdbId" element={<Reviews getMovieData={getMovieData} movie={movie} setReviews={setReviews} reviews={reviews} />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </div>
  );
}

export default App;