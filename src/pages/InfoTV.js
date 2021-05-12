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

function InfoTV() {
  const { TVId } = useParams();
  const [createdBy, setCreatedBy] = useState([]);
  const [totalMinutes, setTotalMinutes] = useState("");
  const [onlyMinutes, setOnlyMinutes] = useState("");
  const [cast, setCast] = useState([]);
  const [fullCast, setFullCast] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [certification, setCertification] = useState("");
  const [TVDetails, setTVDetails] = useState([]);
  const [language, setLanguage] = useState("");
  const [TVDetailsLoading, setTVDetailsLoading] = useState(true);
  const [viewFullCast, setViewFullCast] = useState(false);

  const GET_TV_DETAILS = `https://api.themoviedb.org/3/tv/${TVId}?api_key=${API_KEY}&language=en-US&append_to_response=content_ratings%2Cvideos%2Ccredits`;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  useEffect(() => {
    fetch(GET_TV_DETAILS)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setTVDetails(data);
          setTVDetailsLoading(false);

          if (data.videos.results.length > 0) {
            setTrailer(data.videos.results);
          }

          if (data.episode_run_time.length > 0) {
            if (data.episode_run_time[0] > 60) {
              setTotalMinutes(data.episode_run_time[0]);
            }
            if (data.episode_run_time[0] < 60) {
              setOnlyMinutes(data.episode_run_time[0]);
            }
          }

          if (data.content_ratings.results) {
            const certificationUS = data.content_ratings.results.filter(
              function (el) {
                return el.iso_3166_1 === "US";
              }
            );

            if (certificationUS[0]?.rating) {
              setCertification(certificationUS[0]?.rating);
            }
          }

          if (data.created_by) {
            setCreatedBy(data.created_by);
          }

          if (data.credits.cast) {
            setCast(data.credits.cast.slice(0, 14));
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
  }, [GET_TV_DETAILS, GET_LANGUAGE_API]);

  const viewFullCastHandler = () => {
    setViewFullCast(!viewFullCast);
  };

  return (
    <div className="infopage__container">
      {TVDetailsLoading ? (
        <div className="info_page__spinner">
          <SpinnerContentCustom
            loading={TVDetailsLoading}
            size={20}
            color={"#D1312D"}
          />
        </div>
      ) : (
        <>
          <div className="info_page__details">
            <Info
              IMG_API={IMG_API}
              info={TVDetails}
              title={TVDetails.name}
              certification={certification}
              hours={hours}
              minutes={minutes}
              onlyMinutes={onlyMinutes}
              createdBy={createdBy}
            />
          </div>

          <div className="infopage__separator">
            <span>TV Info</span>
          </div>
          <div className="infopage__details2">
            <Info2
              info={TVDetails}
              hours={hours}
              minutes={minutes}
              onlyMinutes={onlyMinutes}
              homepage={TVDetails.homepage}
              certification={certification}
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
                          light={`https://img.youtube.com/vi/${result.key}/0.jpg`}
                        />
                      </div>
                    </div>
                  ))}
                />
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
                      {viewFullCast ? "View Less" : "View More"}
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

export default InfoTV;
