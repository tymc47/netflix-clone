import { Show, User } from "../types";
import { State } from "./state";

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
    };

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
