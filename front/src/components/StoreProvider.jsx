import React, {useReducer} from "react";
import {initialState, StoreContext} from "../tools/context.js";
import {reducer} from "../tools/reducer.js";

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;