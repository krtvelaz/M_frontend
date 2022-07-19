import { createSlice } from "@reduxjs/toolkit";
import { Loadable, Pageable } from "../../../custom_types";
import { IIndicator } from "../custom_types";

interface State {
    statistics: Loadable<IIndicator | null>;
  
}

const initialState: State = {
  statistics: {
    value: null,
    loading: false,
    loaded: false,
  },
  
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    statistics_default: (state) => {
      state.statistics = {
        value: state.statistics.value,
        loading: true,
        loaded: false,
      };
    },
    statistics_success: (state, action) => {
      state.statistics = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    statistics_fail: (state) => {
      state.statistics = {
        value: initialState.statistics.value,
        loading: false,
        loaded: false,
      };
    },
   
  },
});

// Action creators are generated for each case reducer function
export const {
    statistics_default,
    statistics_success,
    statistics_fail
} = bannerSlice.actions;
