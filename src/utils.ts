import { Movie } from "./types";

export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const rotateMovieArray = (shift: number, array: Movie[]): Movie[] => {
  const copy = [...array];

  for (let i = 0; i < Math.abs(shift); i++) {
    if (shift > 0) {
      const movie = copy.shift();
      if (movie) copy.push(movie);
    } else {
      const movie = copy.pop();
      if (movie) copy.unshift(movie);
    }
  }

  return copy;
};
