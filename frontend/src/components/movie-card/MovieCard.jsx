import React from "react";

import "./movie-card.scss";

import { Link } from "react-router-dom";

import Button from "../button/Button";

import { category } from "../../api/tmdbApi";

const MovieCard = (props) => {
  const item = props.item;

  const link =
   "/" + category[props.category] + "/" + item.id;

  const bg = item.img_poster.url;

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;
