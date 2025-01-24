import api from './api/axiosConfig.js';
import {useEffect, useState} from "react";
import Layout from "./components/Layout.jsx";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import './App.css';
import Header from "./components/header/Header.jsx";
import Trailer from "./components/trailer/Trailer.jsx";

function App() {

    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        try{
            const response = await api.get("/movies");
            setMovies(response.data);
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
            </Route>
        </Routes>
    </div>
  );
}

export default App;