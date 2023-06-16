import axiosClient from "./axiosClient";

import apiConfig from "./apiConfig";

export const category = {
    movie: "movie",
    tv: "tv",
};

export const movieType = {
    upcoming: "upcoming",
    popular: "popular",
    top_rated: "top_rated",
};

export const tvType = {
    popular: "popular",
    top_rated: "top_rated",
    on_the_air: "on_the_air",
};

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = apiConfig.baseUrl + "/api/movie/" + movieType[type];
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = apiConfig.baseUrl + "/api/tv/" + tvType[type];
        return axiosClient.get(url, params);
    },
    search: (cate, params) => {
        const url = apiConfig.baseUrl + "/api/" + category[cate] + "/search";
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = apiConfig.baseUrl + "/api/" + cate + "/" + id;
        return axiosClient.get(url, params);
    },
    credits: (id) => {
        const url = apiConfig.baseUrl + "/api/media" + id;
        return axiosClient.get(url, { params: {} });
    },
};

export default tmdbApi;
