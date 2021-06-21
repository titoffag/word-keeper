import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { initialState as appInitialState } from "AppSlice";
import { RootState } from "store";

const mockStore = configureStore();

export const rootInitialState = {
  app: appInitialState,
};

export const renderWithRedux = (
  ui: JSX.Element,
  initialState: RootState = rootInitialState
) => {
  const store = mockStore(initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    mockStore: store,
  };
};
