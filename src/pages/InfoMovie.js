import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, IMG_API, GET_LANGUAGE_API } from "../api/setAPI";

import Info from "../components/Info";
import Info2 from "../components/Info2";
import InfoCast from "../components/InfoCast";
import CarouselCustom from "../components/CarouselCustom";
import SpinnerContentCustom from "../components/SpinnerContentCustom";

import ReactPlayer from "react-player";
import Hidden from "@material-ui/core/Hidden";
import "./InfoTVMovie.css";

function InfoMovie() {
  const { movieId } = useParams();
  const [crewWriters, setCrewWriters] = useState([]);
  const [crewDirector, setCrewDirector] = useState([]);
  const [cast, setCast] = useState([]);
  const [fullCast, setFullCast] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [certification, setCertification] = useState("");
  const [movieDetails, setMovieDetails] = useState([]);
  const [language, setLanguage] = useState("");
  const [movieDetailsLoading, setMovieDetailsLoading] = useState(true);
  const [viewFullCast, setViewFullCast] = useState(false);

  const GET_MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=releases%2Cvideos%2Ccredits`;

  const totalMinutes = movieDetails.runtime;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  useEffect(() => {
    fetch(GET_MOVIE_DETAILS)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMovieDetails(data);
          setMovieDetailsLoading(false);

          if (data.videos.results.length > 0) {
            setTrailer(data.videos.results);
          }

          if (data.releases.countries) {
            const certificationUS = data.releases.countries.filter(function (
              el
            ) {
              return el.iso_3166_1 === "US";
            });

            if (certificationUS[0]?.certification) {
              setCertification(certificationUS[0]?.certification);
            }

            const filterCountriesByDate = data.releases.countries.filter(
              function (el) {
                var date = data.release_date;
                return el.release_date === date;
              }
            );

            if (
              !certificationUS[0]?.certification &&
              filterCountriesByDate[0]?.certification
            ) {
              setCertification(filterCountriesByDate[0]?.certification);
            }

            const filterCountriesByCountry = filterCountriesByDate.filter(
              function (o1) {
                return data.production_countries.some(function (o2) {
                  return o1.iso_3166_1 === o2.iso_3166_1;
                });
              }
            );

            if (
              !certificationUS[0]?.certification &&
              !filterCountriesByDate[0]?.certification &&
              filterCountriesByCountry[0]?.certification
            ) {
              setCertification(filterCountriesByCountry[0]?.certification);
            }
          }

          if (data.credits.crew) {
            const crewWriters = data.credits.crew.filter(function (el) {
              return (
                el.department === "Writing" &&
                (el.job === "Screenplay" ||
                  el.job === "Writer" ||
                  el.job === "Novel")
              );
            });
            setCrewWriters(crewWriters);

            const crewDirector = data.credits.crew.filter(function (el) {
              return el.department === "Directing" && el.job === "Director";
            });
            setCrewDirector(crewDirector);
          }

          if (data.credits.cast) {
            setCast(data.credits.cast.slice(0, 15));
            setFullCast(data.credits.cast);
          }

          if (data.original_language) {
            fetch(GET_LANGUAGE_API)
              .then((res) => res.json())
              .then((languageResult) => {
                const langauge = languageResult.filter(function (el) {
                  return el.iso_639_1 === data.original_language;
                });
                if (langauge[0]?.name) {
                  setLanguage(langauge[0].english_name);
                }
              });
          }
        }
      });
  }, [GET_MOVIE_DETAILS, GET_LANGUAGE_API]);

  const viewFullCastHandler = () => {
    setViewFullCast(!viewFullCast);
  };

  return (
    <div className="infopage__container">
      {movieDetailsLoading ? (
        <div className="info_page__spinner">
          <SpinnerContentCustom
            loading={movieDetailsLoading}
            size={20}
            color={"#D1312D"}
          />
        </div>
      ) : (
        <>
          <div className="info_page__details">
            <Info
              id={movieDetails.id}
              IMG_API={IMG_API}
              info={movieDetails}
              title={movieDetails.title}
              date={movieDetails.release_date}
              certification={certification}
              hours={hours}
              minutes={minutes}
              crewDirector={crewDirector}
            />
          </div>

          <div className="infopage__separator">
            <span>Movie Info</span>
          </div>
          <div className="infopage__details2">
            <Info2
              info={movieDetails}
              date={movieDetails.release_date}
              hours={hours}
              minutes={minutes}
              homepage={movieDetails.homepage}
              certification={certification}
              crewDirector={crewDirector}
              crewWriters={crewWriters}
              language={language}
            />
          </div>
          <div className="infopage__separator_footer" />

          {trailer.length > 0 ? (
            <>
              <div className="infopage__separator">
                {trailer.length > 1 ? <span>Videos</span> : <span>Video</span>}
              </div>

              <div className="infopage__video_container">
                {trailer.length > 1 ? (
                  <CarouselCustom
                    huge_desktop={2}
                    big_desktop={2}
                    desktop={2}
                    small_desktop={2}
                    tablet={2}
                    small_tablet={1}
                    mobile={1}
                    content={trailer.map((result) => (
                      <div className="infopage__video_player" key={result.id}>
                        <div className="player-wrapper">
                          <ReactPlayer
                            className="react-player"
                            url={`https://www.youtube.com/watch?v=${result.key}`}
                            width="100%"
                            height="100%"
                            controls={true}
                            playing
                            light={`https://img.youtube.com/vi/${result.key}/${
                              "sddefault" || "0"
                            }.jpg`}
                          />
                        </div>
                      </div>
                    ))}
                  />
                ) : (
                  <div className="infopage__video_container">
                    {trailer.map((result) => (
                      <div className="infopage__video_player" key={result.id}>
                        <div className="player-wrapper">
                          <ReactPlayer
                            className="react-player"
                            url={`https://www.youtube.com/watch?v=${result.key}`}
                            width="100%"
                            height="100%"
                            controls={true}
                            playing
                            light={`https://img.youtube.com/vi/${result.key}/${
                              "sddefault" || "0"
                            }.jpg`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="infopage__separator_footer" />
            </>
          ) : null}

          {cast.length > 0 ? (
            <>
              <div className="infopage__separator">
                <span>Cast and Crew</span>
              </div>
              {/* Desktop View */}
              <Hidden xsDown>
                {viewFullCast ? (
                  <div className="info-page__cast-container--full-view">
                    {fullCast.length > 0 &&
                      fullCast.map((result) => (
                        <div
                          key={result.id}
                          className="info-page__cast--full-view"
                        >
                          <InfoCast
                            key={result.id}
                            id={result.id}
                            IMG_API={IMG_API}
                            profile_path={result.profile_path}
                            original_name={result.original_name}
                            character={result.character}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="info_page__cast_container">
                    <CarouselCustom
                      huge_desktop={5}
                      big_desktop={5}
                      desktop={5}
                      small_desktop={5}
                      tablet={4}
                      small_tablet={3}
                      mobile={2}
                      content={
                        cast.length > 0 &&
                        cast.map((result) => (
                          <div key={result.id}>
                            <InfoCast
                              key={result.id}
                              id={result.id}
                              IMG_API={IMG_API}
                              profile_path={result.profile_path}
                              original_name={result.original_name}
                              character={result.character}
                            />
                          </div>
                        ))
                      }
                    />
                  </div>
                )}
                {fullCast.length > 4 ? (
                  <div
                    className={`infopage__separator-footer ${
                      viewFullCast && "infopage__separator-footer--less"
                    }`}
                  >
                    <span onClick={viewFullCastHandler}>
                      {viewFullCast ? (
                        "View Less"
                      ) : (
                        <>{fullCast.length > 14 ? "View More" : "Expand"}</>
                      )}
                    </span>
                  </div>
                ) : (
                  <div className="infopage__separator_footer" />
                )}
              </Hidden>

              {/* Mobile View */}
              <Hidden smUp>
                <div className="info_page__cast_container info_page__cast_container_scroll">
                  {viewFullCast ? (
                    <>
                      {fullCast.length > 0 &&
                        fullCast.map((result) => (
                          <div key={result.id} className="info_page__cast">
                            <InfoCast
                              key={result.id}
                              id={result.id}
                              IMG_API={IMG_API}
                              profile_path={result.profile_path}
                              original_name={result.original_name}
                              character={result.character}
                            />
                          </div>
                        ))}
                    </>
                  ) : (
                    <>
                      {cast.length > 0 &&
                        cast.map((result) => (
                          <div key={result.id} className="info_page__cast">
                            <InfoCast
                              key={result.id}
                              id={result.id}
                              IMG_API={IMG_API}
                              profile_path={result.profile_path}
                              original_name={result.original_name}
                              character={result.character}
                            />
                          </div>
                        ))}
                    </>
                  )}
                </div>
                {fullCast.length > 14 ? (
                  <div
                    className={`infopage__separator-footer ${
                      viewFullCast && "infopage__separator-footer--less"
                    }`}
                  >
                    <span onClick={viewFullCastHandler}>
                      {viewFullCast ? "View Less" : "View More"}
                    </span>
                  </div>
                ) : (
                  <div className="infopage__separator_footer" />
                )}
              </Hidden>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default InfoMovie;
