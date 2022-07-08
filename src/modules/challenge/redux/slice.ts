import { createSlice } from "@reduxjs/toolkit";
import { Loadable, Pageable } from "../../../custom_types";
import { IChallenge } from "../custom_types";

interface State {
  challenge: Loadable<IChallenge | null>;
  challenges: Pageable<IChallenge>;
}

const initialState: State = {
  challenge: {
    value: null,
    loading: false,
    loaded: false,
  },
  challenges: {
    value: [],
    pagination: {
      page: 1,
      count: 0,
      next_page: null,
      previous_page: null,
      total_results: 0,
    },
    loading: false,
    loaded: false,
  },
};

export const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    loading_challenge: (state) => {
      state.challenge = {
        value: state.challenge.value,
        loading: true,
        loaded: false,
      };
    },
    get_challenge: (state, action) => {
      state.challenge = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    fail_challenge: (state) => {
      state.challenge = {
        value: initialState.challenge.value,
        loading: false,
        loaded: false,
      };
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { loading_challenge, get_challenge, fail_challenge } = challengeSlice.actions;
