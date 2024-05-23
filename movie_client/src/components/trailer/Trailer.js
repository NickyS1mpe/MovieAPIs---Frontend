import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "./Trailer.css";

function Trailer() {
  let parmas = useParams();
  const key = parmas.ytTrailerId;
  return (
    <div className="react-player-container">
      {key != null ? (
        <ReactPlayer
          controls="True"
          playing={true}
          url={`https://www.youtube.com/watch?v=${key}`}
          width="100%"
          height="100%"
        />
      ) : null}
    </div>
  );
}

export default Trailer;
