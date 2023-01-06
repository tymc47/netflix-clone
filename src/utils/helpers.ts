import userService from "../services/userService";
import { ShowByFilter } from "../state";
import { Show, User } from "../types";

export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  return re.test(phone);
};

export const rotateMovieArray = (shift: number, array: Show[]): Show[] => {
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

export const rearrangeShowByFilter = (
  array: ShowByFilter[]
): ShowByFilter[] => {
  if (array.length === 0) return [];
  const arrayCopy = [...array];
  let randomIndex,
    index = arrayCopy.length;

  while (index !== 0) {
    randomIndex = Math.floor(Math.random() * index);
    index -= 1;

    [arrayCopy[index], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[index],
    ];
  }

  const trending = arrayCopy.findIndex(
    (item) => item.filter === "Trending Now"
  );

  [arrayCopy[trending], arrayCopy[0]] = [arrayCopy[0], arrayCopy[trending]];

  return arrayCopy;
};

export const getTwoRandomInteger = (): number[] => {
  let number_1 = Math.floor(Math.random() * 5);
  let number_2 = Math.floor(Math.random() * 5);

  do {
    number_1 = Math.floor(Math.random() * 5);
    number_2 = Math.floor(Math.random() * 5);
  } while (number_1 === number_2 || number_1 === 0 || number_2 === 0);

  return [number_1, number_2];
};

export const shuffleShowArray = (shows: Show[]): Show[] => {
  const arrayCopy = [...shows];
  let randomIndex,
    index = arrayCopy.length;

  while (index !== 0) {
    randomIndex = Math.floor(Math.random() * index);
    index -= 1;

    [arrayCopy[index], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[index],
    ];
  }

  return arrayCopy;
};

export const signIn = (user: User) => {
  window.localStorage.setItem("netflix-cloneUser", JSON.stringify(user));
  window.localStorage.setItem(
    "netflix-cloneUser-List",
    JSON.stringify(user.mylist)
  );
  userService.setToken(user.token);
};

export const signOut = () => {
  window.localStorage.removeItem("netflix-cloneUser");
  window.localStorage.removeItem("netflix-cloneUser-List");
  window.scrollTo(0, 0);
  userService.setToken("");
};
