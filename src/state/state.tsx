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

export type State = {
  user: User | null;
  account: string;
  mylist: Show[];
};

const initialState: State = {
  user: null,
  account: "",
  mylist: [],
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
