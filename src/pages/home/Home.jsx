import Hero from "../../components/hero/Hero.jsx";


const Home = ({movies}) => {
    return (
        <>
            <Hero movies={movies} />
        </>
    );
};

export default Home;