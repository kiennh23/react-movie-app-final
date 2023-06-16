import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import tmdbApi from "./../../api/tmdbApi";
import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "./../../components/movie-list/MovieList";

const Detail = () => {
    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);
        };
        getDetail();
    }, [category, id]);

    return (
        <>
            {item && (
                <>
                    <div
                        className='banner'
                        style={{
                            backgroundImage: `url(${item.img_cover.url})`,
                        }}
                    ></div>

                    <div className='mb-3 movie-content container'>
                        <div className='movie-content__poster'>
                            <div
                                className='movie-content__poster__img'
                                style={{
                                    backgroundImage: `url(${item.img_cover.url})`,
                                }}
                            ></div>
                        </div>

                        <div className='movie-content__info'>
                            <h1 className='title'>{item.title || item.name}</h1>
                            <div className='genres'>
                                {item.genres &&
                                    item.genres
                                        .slice(0, 5)
                                        .map((genre, index) => (
                                            <span
                                                key={index}
                                                className='genres__item'
                                            >
                                                {genre.genres}
                                            </span>
                                        ))}
                            </div>
                            <p className='overview'>{item.overview}</p>
                            <div className='cast'>
                                <div className='section__header'>
                                    <h2>Casts</h2>
                                </div>
                                {/* casts list */}
                                <CastList item={item} />
                            </div>
                        </div>
                    </div>

                    <div className='container'>
                        <div className='section mb-3'>
                            {/* <VideoList item={item} /> */}
                        </div>
                        <div className='section mb-3'>
                            <video
                                style={{
                                    width: "100%",
                                    maxWidth: "1200px",
                                    margin: "0 auto",
                                    display: "block",
                                }}
                                src={item.url}
                                controls
                            ></video>
                        </div>
                        <div className='section mb-3'>
                            <div className='section__header mb-2'>
                                <h2>Similar</h2>
                            </div>
                            <MovieList
                                category={category}
                                type='similar'
                                similar={item.similar ? item.similar : []}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Detail;
