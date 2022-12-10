import axios from "axios";
import { Logo, Movie, Video } from "../types";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_APIKEY;

export const getOneMovie = async (): Promise<Movie> => {
  let movie;
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  if (response.status === 200) {
    movie =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ];
    const logo_response =
      await axios.get(`${BASE_URL}/movie/${movie.id}/images?api_key=${API_KEY}
    `);

    const video_response =
      await axios.get(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}
    `);

    console.log(video_response.data);
    if (logo_response.status === 200)
      movie.logo = logo_response.data.logos.find(
        (logo: Logo) => logo.iso_639_1 === "en"
      );

    if (video_response.status === 200)
      movie.video = video_response.data.results.find(
        (video: Video) =>
          video.official && video.site === "YouTube" && video.type === "Trailer"
      );
  }

  return {
    backdrop_path: movie.backdrop_path,
    poster_path: movie.poster_path,
    title: movie.title,
    id: movie.id,
    overview: movie.overview,
    logo: movie.logo,
    video: movie.video,
  };
};

export const getTrending = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  if (response.status === 200) return response.data.results;

  return;
};
