import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTop100Query } from "../redux/services/shazamCore";

import "swiper/css"
import "swiper/css/free-mode"


const TopChartCard = ({song, i}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-3 p-4 rounded-lg cursor-pointer mb-2" >
    {song.track.name}
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data } = useGetTop100Query()
  const divRef = useRef(null)

  useEffect (() => {
    divRef.current.scrollIntoView({behaviour : "smooth"})
  })

  const topPlays = data.items?.slice(0, 5)
  console.log(data);

  const handlePauseClick = () =>{
    dispatch(playPause(false))
  }

  const handlePlayClick = () =>{
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col" >
      <div className="w-full flex flex-col" >
        <div className="flex flex-row justify-between items-center" >
          <h2 className="text-white font-bold text-2xl" >
            Top Chart
          </h2>
          <Link to="/top-charts" >
            <p className="text-gray-300 text-base cursor-pointer" >
              See More
            </p>
          </Link>
        
          <div className="mt-4 flex flex-col gap-1">
            {topPlays?.map((song, i) => (
              <TopChartCard 
                song={song}
                i={i}
                key={song.track}
              />
            )) }
          </div>
        </div>
      </div>

      <div className="mt-8 w-full flex flex-col">
        <div className="flex flex-row justify-between items-center" >
            <h2 className="text-white font-bold text-2xl" >
              Top Artists
            </h2>
            <Link to="/top-artists" >
              <p className="text-gray-300 text-base cursor-pointer" >
                See More
              </p>
            </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays.map((song,i ) => (
            <SwiperSlide
              key={song.track}
              style={{width: "25%", height: "auto"}}
              className="shadow-lg rounded-full animate-slideright "
            >
              <Link to={`/artists/${song?.track.artists[0].name}`} >
                {/* <img src={song?.} /> */}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  )
}

export default TopPlay;
