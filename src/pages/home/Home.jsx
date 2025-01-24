import Hero from "../../components/hero/Hero";


const Home = ({movies}) => {
    return (
        <>
            <Hero movies={movies} />
        </>
    );
};

export default Home;