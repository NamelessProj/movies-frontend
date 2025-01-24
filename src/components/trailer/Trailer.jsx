import './Trailer.css';
import {useParams} from "react-router-dom";
import ReactPlayer from "react-player";

const Trailer = () => {
    const {ytTrailerId} = useParams();

    return (
        <div className="react-player-container">
            {ytTrailerId !== null && <ReactPlayer controls playing url={`https://www.youtube.com/watch?v=${ytTrailerId}`} width="100%" height="100%" />}
        </div>
    );
};

export default Trailer;