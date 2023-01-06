import {
  createContext,
  Dispatch,
  ReactElement,
  Reducer,
  useContext,
  useReducer,
} from "react";
import { User, Show } from "../types";
import { Action } from "./reducer";

export interface ShowByFilter {
  filter: string;
  shows: Show[];
}

export interface State {
  user: User | null;
  account: string;
  mylist: Show[];
  movieData: ShowByFilter[];
  tvshowData: ShowByFilter[];
  homeData: ShowByFilter[];
}

const initialState: State = {
  user: null,
  account: "",
  mylist: [],
  movieData: [],
  tvshowData: [],
  homeData: [],
};

export const StateContext = createContext<[State, Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: Reducer<State, Action>;
  children: ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
