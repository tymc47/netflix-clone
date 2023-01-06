import { Show, User } from "../types";
import { shuffleShowArray } from "../utils/helpers";
import { ShowByFilter, State } from "./state";

export type Action =
  | {
      type: "SET_USER";
      payload: User;
    }
  | { type: "REMOVE_USER" }
  | { type: "SET_ACCOUNT"; payload: string }
  | {
      type: "UPDATE_MYLIST";
      payload: Show[];
    }
  | { type: "SET_MOVIEDATA"; payload: ShowByFilter }
  | { type: "SET_TVSHOWDATA"; payload: ShowByFilter }
  | { type: "SET_HOMEDATA"; payload: ShowByFilter };

export const reducer = (state: State, action: Action): State => {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload,
      mylist: action.payload.mylist,
    };
  } else if (action.type === "REMOVE_USER") {
    return {
      ...state,
      user: null,
    };
  } else if (action.type === "SET_ACCOUNT") {
    return {
      ...state,
      account: action.payload,
    };
  } else if (action.type === "UPDATE_MYLIST") {
    if (!state.user) return state;

    return {
      ...state,
      mylist: action.payload,
    };
  } else if (action.type === "SET_MOVIEDATA") {
    const newData = state.movieData.concat(action.payload);

    return {
      ...state,
      movieData: newData,
    };
  } else if (action.type === "SET_TVSHOWDATA") {
    const newData = state.tvshowData.concat(action.payload);

    return {
      ...state,
      tvshowData: newData,
    };
  } else if (action.type === "SET_HOMEDATA") {
    const filter = action.payload.filter;
    const targetRow = state.homeData.find((data) => data.filter === filter);
    let newMerged = state.homeData.concat(action.payload);
    if (targetRow) {
      const newShowData = shuffleShowArray(
        targetRow.shows.concat(action.payload.shows)
      );
      const newRow = {
        filter: filter,
        shows: newShowData,
      };
      newMerged = state.homeData.map((obj) =>
        obj.filter === filter ? newRow : obj
      );
    }

    return {
      ...state,
      homeData: newMerged,
    };
  }

  return state;
};

export const setUser = (user: User): Action => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const removeUser = (): Action => {
  return {
    type: "REMOVE_USER",
  };
};

export const setAccount = (account: string): Action => {
  return {
    type: "SET_ACCOUNT",
    payload: account,
  };
};

export const updateMyList = (show: Show[]): Action => {
  return {
    type: "UPDATE_MYLIST",
    payload: show,
  };
};

export const setShowData = (shows: Show[], filter: string): Action => {
  const showData = shuffleShowArray(shows);

  if (shows && shows[0].type === "tv")
    return {
      type: "SET_TVSHOWDATA",
      payload: {
        filter: filter,
        shows: showData,
      },
    };
  else
    return {
      type: "SET_MOVIEDATA",
      payload: {
        filter: filter,
        shows: showData,
      },
    };
};

export const setHomeData = (shows: Show[], filter: string): Action => {
  const showData = shows.slice(0, 19);

  return {
    type: "SET_HOMEDATA",
    payload: {
      filter: filter,
      shows: showData,
    },
  };
};
