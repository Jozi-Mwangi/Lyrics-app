import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";


const SongCard = ({ song, i , data, isPlaying, activeSong}) => {

  const dispatch = useDispatch()

  const handlePauseClick = () =>{
    dispatch(playPause(false))
  }
  
  const handlePlayClick = () =>{
    dispatch(setActiveSong( {song, data, i} ))
    dispatch(playPause(true))
  }

  return (
  <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer "  >  
    <div className="relative w-full h-56 group"  >
      <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.track === song.track? "flex bg-black bg-opacity-70 " : "hidden" } `}>
        <PlayPause
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
          isPlaying={isPlaying}
          activeSong={activeSong}
        />
      </div>
      <img alt="song_img" src={song.track.album.images[0].url}  />
    </div>

    <div className="mt-4 flex flex-col" >
      <p className="font-semibold text-lg truncate text-white" >
        <Link to={`/songs/${song?.track.id}`} >
          {song.track.name}
        </Link>
      </p>
      <p className="font-sm truncate text-gray-300 mt-1" >
        <Link to={song.track.artists[0].name?`/artists/${song?.track.artists[0]?.name}`: "/top-artists"} >
          {song.track.artists[0].name}
        </Link>
      </p>
    </div>
  
  </div>
  )
};

export default SongCard;
