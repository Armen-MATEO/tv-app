import { useState, useRef, useEffect } from "react";
import "./App.css";
import irishman from "./assets/FeaturedTitleImage.png";
import search from "./assets/icons/ICON - Search.png";
import home from "./assets/icons/Group 46.png";
import play from "./assets/icons/Group 56.png";
import lent from "./assets/icons/Group 54.png";
import mask from "./assets/icons/Group 53.png";
import time from "./assets/icons/Group 47.png";
import movies from "../data/data.json";
import movie1 from "./assets/https_specials-1.png";
import movie2 from "./assets/https_specials-2.png";
import movie3 from "./assets/https_specials-3.png";
import movie4 from "./assets/https_specials-4.png";
import movie5 from "./assets/https_specials-5.png";
import movie6 from "./assets/https_specials-6.png";
import movie7 from "./assets/https_specials-7.png";
import movie8 from "./assets/https_specials-8.png";

const moviesArray = [
  0,
  movie1,
  movie2,
  movie3,
  movie4,
  movie5,
  movie6,
  movie7,
  movie8,
];

function App() {
  const [open, setOpen] = useState(false);
  const [feature, setFeature] = useState({});
  const [position, setPosition] = useState("");
  const [action, setAction] = useState();
  const [actVideo, setActVideo] = useState(false);

  const timerRef = useRef();
  const isLongPress = useRef();

  useEffect(() => {
    const lastMovieViewed = localStorage.getItem("lastViewed");
    findLastViewed(lastMovieViewed);
    return () => {};
  }, []);

  const findLastViewed = (id) => {
    movies.TendingNow.map((element) => {
      if (element.Id === id) setFeature(element);
    });
  };

  const findMovie = (_id) => {
    movies.TendingNow.map((movie) => {
      if (movie.Id === _id) {
        setFeature(movie);
        localStorage.setItem("lastViewed", movie.Id);
      }
    });
  };

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction("longpress");
    }, 2000);
  }

  function handleOnClick(id) {
    if (isLongPress.current) {
      setActVideo(!actVideo);
      return;
    }
    findMovie(id);
    setActVideo(false);
    setAction("click");
  }

  function handleOnMouseDown() {
    startPressTimer();
  }

  function handleOnMouseUp() {
    clearTimeout(timerRef.current);
  }

  function handleOnTouchStart() {
    startPressTimer();
  }

  function handleOnTouchEnd() {
    if (action === "longpress") return;
    // console.log('handleOnTouchEnd');
    clearTimeout(timerRef.current);
  }

  return (
    <>
      <div
        className="container"
        onClick={() => {
          open ? setOpen(!open) : !open;
        }}
      >
        <div className="icons">
          <div className="iconContainer">
            <div className="icon">
              <img
                src={search}
                alt="search"
                onMouseOver={() => {
                  open ? open : setOpen(!open);
                }}
              />
            </div>
            <div className="icon">
              <img
                src={home}
                alt="search"
                onMouseOver={() => {
                  open ? open : setOpen(!open);
                }}
              />
            </div>
            <div className="icon">
              <img
                src={play}
                alt="search"
                onMouseOver={() => {
                  open ? open : setOpen(!open);
                }}
              />
            </div>
            <div className="icon">
              <img
                src={lent}
                alt="search"
                onMouseOver={() => {
                  open ? open : setOpen(!open);
                }}
              />
            </div>
            <div className="icon">
              <img
                src={mask}
                alt="search"
                onMouseOver={() => {
                  open ? open : setOpen(!open);
                }}
              />
            </div>
            <div className="icon">
              <img
                src={time}
                alt="search"
                onMouseOver={() => {
                  open ? open : setOpen(!open);
                }}
              />
            </div>
          </div>

          <div className={`${open ? "open" : ""}`}>
            {open && (
              <div className="fields">
                <h5 className="accountname" style={{ marginTop: "85px" }}>
                  Daniel
                </h5>
                <h5
                  className="fieldName"
                  style={{ marginTop: "83px", cursor: "pointer" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Search
                </h5>
                <h5
                  className="fieldName"
                  style={{ marginTop: "52px", cursor: "pointer" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Home
                </h5>
                <h5
                  className="fieldName"
                  style={{ marginTop: "52px", cursor: "pointer" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  TV Shows
                </h5>
                <h5
                  className="fieldName"
                  style={{ marginTop: "52px", cursor: "pointer" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Movies
                </h5>
                <h5
                  className="fieldName"
                  style={{ marginTop: "52px", cursor: "pointer" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Genres
                </h5>
                <h5
                  className="fieldName"
                  style={{ marginTop: "52px", cursor: "pointer" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Watch Later
                </h5>
                <h5
                  className="footer"
                  style={{ marginTop: "160px", cursor: "pointer" }}
                >
                  Language
                </h5>
                <h5 className="footer" style={{ cursor: "pointer" }}>
                  Get Help
                </h5>
                <h5 className="footer" style={{ cursor: "pointer" }}>
                  Exit
                </h5>
              </div>
            )}
          </div>
        </div>
        <div className="main">
          {actVideo && (
            <video
              autoPlay={true}
              loop={true}
              preload="auto"
              muted
              width="1760px"
            >
              <source
                src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
                type="video/mp4"
              />
            </video>
          )}

          {feature.Id ? (
            <img
              className="cover"
              src={moviesArray[Number(feature?.CoverImage?.slice(15, 16))]}
              alt="irish man"
            />
          ) : (
            <img src={irishman} alt="gg" className="irishimg" />
          )}
          {feature.Id ? (
            !actVideo && <h3 className="movie">{feature?.Category}</h3>
          ) : (
            <h3 className="movie">movie</h3>
          )}
          {!actVideo && <h1 className="time">{feature?.Title}</h1>}

          {!actVideo && <img src={irishman} alt="gg" className="irishimg" />}

          {feature.Id ? (
            <h5 className="time">
              {!actVideo && (
                <span>
                  {feature?.Date?.slice(0, 4)} <span>{feature?.MpaRating}</span>
                </span>
              )}

              {!actVideo && (
                <span>
                  {" "}
                  {feature && Math.floor(feature?.Duration / 3600)}h{" "}
                  {feature && Math.floor((feature?.Duration % 3600) / 60)}m{" "}
                </span>
              )}
            </h5>
          ) : (
            <h5 className="time">2021 18+ 1h 48m</h5>
          )}
          {feature.Id ? (
            !actVideo && <h5 className="dummytext">{feature.Description}</h5>
          ) : (
            <h5 className="dummytext">
              lorem ipsum is simply dummy text for printing
              <br /> and tipesetting industry. Lorem ipsum has been the <br />{" "}
              industrys standart dummy text ever since the 1500s.
            </h5>
          )}
          {!actVideo && (
            <div className="btncontainer">
              <button className="whitebtn">&#10148; Play</button>
              <button className="bluebtn">More Info</button>
            </div>
          )}
        </div>
        <div className={["trend"]}>
          <h5>trending now</h5>
          <div>
            <div className="videos">
              {movies.TendingNow.map((item) => {
                return (
                  <div key={item.Id} className="videoitem">
                    <div className={position} draggable={true}>
                      <img
                        className="film"
                        src={moviesArray[Number(item.CoverImage.slice(15, 16))]}
                        alt={item.TitleImage}
                        onDrag={() => {
                          setPosition("nextSlide");
                        }}
                        onMouseLeave={() => {
                          setPosition("lastSlide");
                        }}
                        onMouseDown={handleOnMouseDown}
                        onMouseUp={handleOnMouseUp}
                        onTouchStart={handleOnTouchStart}
                        onTouchEnd={handleOnTouchEnd}
                        onClick={() => handleOnClick(item.Id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
