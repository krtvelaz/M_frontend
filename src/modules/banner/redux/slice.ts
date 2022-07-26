import { createSlice } from "@reduxjs/toolkit";
import { Loadable, Pageable } from "../../../custom_types";
import { IIndicator, IMainBanner, ITestimony } from "../custom_types";

interface State {
    statistics: Loadable<IIndicator | null>;
    testimony: Loadable<ITestimony | null>;
    testimonials: any;
    banner: Loadable<IMainBanner | null>;
    list_banners: any;
}

const initialState: State = {
  statistics: {
    value: null,
    loading: false,
    loaded: false,
  },
  testimony: {
    value: null,
    loading: false,
    loaded: false,
  },
  testimonials: {
    value: [],
    loading: false,
    loaded: false,
  },
  banner: {
    value: null,
    loading: false,
    loaded: false,
  },
  list_banners: {
    value: [],
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
    testimony_default: (state) => {
      state.testimony = {
        value: state.testimony.value,
        loading: true,
        loaded: false,
      };
    },
    testimony_success: (state, action) => {
      state.testimony = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    testimony_fail: (state) => {
      state.testimony = {
        value: initialState.testimony.value,
        loading: false,
        loaded: false,
      };
    },

    testimonials_list_default: (state) => {
      state.testimonials = {
        value: state.testimonials.value,
        loading: true,
        loaded: false,
      };
    },
    testimonials_list_success: (state, action) => {
      state.testimonials = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    testimonials_list_fail: (state) => {
      state.testimonials = {
        value: initialState.testimonials.value,
        loading: false,
        loaded: false,
      };
    },

    banner_default: (state) => {
      state.banner = {
        value: state.banner.value,
        loading: true,
        loaded: false,
      };
    },
    banner_success: (state, action) => {
      state.banner = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    banner_fail: (state) => {
      state.banner = {
        value: initialState.banner.value,
        loading: false,
        loaded: false,
      };
    },
    banners_list_default: (state) => {
      state.list_banners = {
        value: state.list_banners.value,
        loading: true,
        loaded: false,
      };
    },
    banners_list_success: (state, action) => {
      state.list_banners = {
        value: action.payload,
        loading: false,
        loaded: true,
      };
    },
    banners_list_fail: (state) => {
      state.list_banners = {
        value: initialState.list_banners.value,
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
    statistics_fail,
    testimony_default,
    testimony_success,
    testimony_fail,
    testimonials_list_default,
    testimonials_list_success,
    testimonials_list_fail,
    banner_default,
    banner_success,
    banner_fail,
    banners_list_default,
    banners_list_success,
    banners_list_fail,
} = bannerSlice.actions;
