import axios from "axios";
import {
  APIResponse,
  Logo,
  MediaType,
  Movie,
  Show,
  ShowAPI,
  SliderFilter,
  Tab,
  TvShow,
} from "../types";
import { getTwoRandomInteger } from "../utils";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_APIKEY;

const tabToType = (tab: Tab): MediaType => {
  return tab === "home"
    ? Math.random() > 0.5
      ? "movie"
      : "tv"
    : tab === "movies"
    ? "movie"
    : "tv";
};

const cleanData = (shows: ShowAPI[]): Show[] => {
  const withPoster = shows.filter((show) => !!show.poster_path);
  const results = withPoster.map((show) => {
    if ("title" in show) {
      return {
        type: "movie" as const,
        backdrop_path: show.backdrop_path,
        poster_path: show.poster_path,
        id: show.id,
        overview: show.overview,
        title: show.title,
      };
    } else
      return {
        type: "tv" as const,
        backdrop_path: show.backdrop_path,
        poster_path: show.poster_path,
        id: show.id,
        overview: show.overview,
        name: show.name,
      };
  });

  return results;
};

const getShowForBillboard = async (
  tab: Tab
): Promise<Movie | TvShow | null> => {
  const type: MediaType = tabToType(tab);

  const response = await axios.get(
    `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  if (response && response.status === 200) {
    const shows = response.data.results.filter(
      (data: Movie) => !!data.overview
    );
    let show = shows[Math.floor((Math.random() * shows.length) / 2)];
    while (!show.logo) {
      show = shows[Math.floor((Math.random() * shows.length) / 2)];
      const logo_response =
        await axios.get(`${BASE_URL}/${type}/${show.id}/images?api_key=${API_KEY}
    `);

      if (logo_response.status === 200)
        show.logo = logo_response.data.logos.find(
          (logo: Logo) => logo.iso_639_1 === "en"
        );
    }

    return type === "tv"
      ? {
          type: "tv",
          backdrop_path: show.backdrop_path,
          poster_path: show.poster_path,
          id: show.id,
          overview: show.overview,
          logo: show.logo,
          name: show.name,
        }
      : {
          type: "movie",
          backdrop_path: show.backdrop_path,
          poster_path: show.poster_path,
          id: show.id,
          overview: show.overview,
          logo: show.logo,
          title: show.title,
        };
  }

  return null;
};

const sliderOptions: SliderFilter[] = [
  {
    filter: "Trending Now",
    movieUrl: `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`,
    tvUrl: `${BASE_URL}/trending/tv/day?api_key=${API_KEY}&language=en-US`,
  },
  {
    filter: "Action & Adventure",
    movieUrl: `${BASE_URL}/discover/movie/?api_key=${API_KEY}&language=en-US&include_adult=false&region=US&with_genres=28`,
    tvUrl: `${BASE_URL}/discover/tv/?api_key=${API_KEY}&language=en-US&include_adult=false&region=US&with_genres=10759`,
  },
  {
    filter: "Sci-Fi",
    movieUrl: `${BASE_URL}/discover/movie/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=878`,
    tvUrl: `${BASE_URL}/discover/tv/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=10765`,
  },
  {
    filter: "Documentary",
    movieUrl: `${BASE_URL}/discover/movie/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=99`,
    tvUrl: `${BASE_URL}/discover/tv/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=99`,
  },
  {
    filter: "Comedy",
    movieUrl: `${BASE_URL}/discover/movie/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=35`,
    tvUrl: `${BASE_URL}/discover/tv/?api_key=${API_KEY}&language=en-US&region=US&include_adult=false&with_genres=35`,
  },
];

const getShowsByFilter = async (
  filter: SliderFilter,
  tab: Tab
): Promise<Show[] | undefined> => {
  let url_1 = "",
    url_2 = "";

  const [page_1, page_2] = getTwoRandomInteger();

  if (tab === "movies") {
    url_1 = `${filter.movieUrl}&page=${page_1}`;
    url_2 = `${filter.movieUrl}&page=${page_2}`;
  } else if (tab === "tvshows") {
    url_1 = `${filter.tvUrl}&page=${page_1}`;
    url_2 = `${filter.tvUrl}&page=${page_2}`;
  } else {
    url_1 = `${filter.tvUrl}&page=${page_1}`;
    url_2 = `${filter.movieUrl}&page=${page_1}`;
  }

  const response_1 = await axios.get<APIResponse>(url_1);

  const response_2 = await axios.get<APIResponse>(url_2);

  const dataset1 = response_1.status === 200 ? response_1.data.results : null;

  const dataset2 = response_1.status === 200 ? response_2.data.results : null;

  if (dataset1 && dataset2) {
    return cleanData(dataset1).concat(cleanData(dataset2));
  }

  return;
};

export default {
  getShowForBillboard,
  getShowsByFilter,
  sliderOptions,
};
