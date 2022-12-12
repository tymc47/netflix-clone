import axios from "axios";
import { Logo, Movie, SliderFilter, Tab, Video } from "../types";
import { getTwoRandomInteger } from "../utils";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_APIKEY;

const filterShowWithoutPoster = (movies: Movie[]): Movie[] => {
  return movies.filter((movie: Movie) => !!movie.poster_path);
};

export const getShowForBillboard = async (tab: Tab): Promise<Movie> => {
  let show;
  const type = tab !== "home" ? tab : Math.random() > 0.5 ? "movie" : "tv";

  const response = await axios.get(
    `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  if (response && response.status === 200) {
    console.log(response);
    show = response.data.results[Math.floor(Math.random() * 10)];
    const logo_response =
      await axios.get(`${BASE_URL}/${type}/${show.id}/images?api_key=${API_KEY}
    `);

    const video_response =
      await axios.get(`${BASE_URL}/${type}/${show.id}/videos?api_key=${API_KEY}
    `);

    console.log(video_response.data);
    if (logo_response.status === 200)
      show.logo = logo_response.data.logos.find(
        (logo: Logo) => logo.iso_639_1 === "en"
      );

    if (video_response.status === 200)
      show.video = video_response.data.results.find(
        (video: Video) =>
          video.official && video.site === "YouTube" && video.type === "Trailer"
      );
  }

  return {
    backdrop_path: show.backdrop_path,
    poster_path: show.poster_path,
    title: show.title,
    id: show.id,
    overview: show.overview,
    logo: show.logo,
    video: show.video,
  };
};

export const sliderOptions: SliderFilter[] = [
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

export const getShowsByFilter = async (
  filter: SliderFilter,
  tab: Tab
): Promise<Movie[] | undefined> => {
  let url_1 = "",
    url_2 = "";

  const [page_1, page_2] = getTwoRandomInteger();

  if (tab === "movie") {
    url_1 = `${filter.movieUrl}&page=${page_1}`;
    url_2 = `${filter.movieUrl}&page=${page_2}`;
  } else if (tab === "tv") {
    url_1 = `${filter.tvUrl}&page=${page_1}`;
    url_2 = `${filter.tvUrl}&page=${page_2}`;
  } else {
    url_1 = `${filter.tvUrl}&page=${page_1}`;
    url_2 = `${filter.movieUrl}&page=${page_1}`;
  }

  const response_1 = await axios.get(url_1);

  const response_2 = await axios.get(url_2);

  if (response_1.status === 200 && response_2.status === 200) {
    return filterShowWithoutPoster(
      response_1.data.results.concat(response_2.data.results)
    );
  }

  return;
};
