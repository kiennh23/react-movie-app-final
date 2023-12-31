import React, { useEffect, useRef, useState } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PropagateLoader from "react-spinners/PropagateLoader";

import Button, { OutlineButton } from "./../button/Button";
import Modal, { ModalContent } from "./../modal/Modal";

import tmdbApi, { movieType } from "./../../api/tmdbApi";
import { OVERRIDE } from "../../constants/Config";

import "./hero-slide.scss";
import { useHistory } from "react-router";

const HeroSlide = () => {
    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbApi.getMoviesList(
                    movieType.popular,
                    {
                        params,
                    }
                );
                setMovieItems(response.results.slice(0, 4));
            } catch {
                console.log("error");
            }
        };
        getMovies();
    }, []);

    return (
        <div className='hero-slide'>
            {movieItems.length < 1 ? (
                <PropagateLoader cssOverride={OVERRIDE} color='#36d7b7' />
            ) : (
                <Swiper
                    modules={[Autoplay]}
                    grabCursor={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{ delay: 4000 }}
                >
                    {movieItems.map((item, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                // eslint-disable-next-line jsx-a11y/alt-text
                                <HeroSlideItem
                                    item={item}
                                    className={`${isActive ? "active" : ""}`}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
            {movieItems.map((item, index) => (
                <TrailerModal key={index} item={item} />
            ))}
        </div>
    );
};

const HeroSlideItem = (props) => {
    let history = useHistory();

    const item = props.item;

    const background = item.img_cover.url;

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = item.url;

        if (videos) {
            const videoSrc = videos;
            modal
                .querySelector(".modal__content > iframe")
                .setAttribute("src", videoSrc);
        } else {
            modal.querySelector(".modal__content").innerHTML = "No trailer";
        }

        modal.classList.toggle("active");
    };

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className='hero-slide__item__content container'>
                <div className='hero-slide__item__content__info'>
                    <h2 className='title'>{item.title}</h2>
                    <div className='overview'>{item.overview}</div>
                    <div className='btns'>
                        <Button
                            onClick={() => history.push(`/movie/` + item.id)}
                        >
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>

                <div className='hero-slide__item__content__poster'>
                    <img src={item.img_poster.url} alt='' />
                </div>
            </div>
        </div>
    );
};

const TrailerModal = (props) => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute("src", "");

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe
                    ref={iframeRef}
                    width='100%'
                    height='500px'
                    title='trailer'
                ></iframe>
            </ModalContent>
        </Modal>
    );
};

export default HeroSlide;
