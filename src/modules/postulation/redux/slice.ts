import { createSlice } from '@reduxjs/toolkit';
import { Loadable, Pageable } from '../../../custom_types';
import {
    IIndicator,
    IPostulation,
    ITestimony,
} from '../../postulation/custom_types';

interface State {
    statistics: Loadable<IIndicator | null>;
    testimony: Loadable<ITestimony | null>;
    testimonials: any;
    postulation: Loadable<IPostulation | null>;
    list_postulations: any;
    documentType: Loadable<any | null>;
    numberContact:Loadable<any | null>;
    profile:Loadable<any | null>;
    memberPostulation:Loadable<any | null>;
    addDocument:Loadable<any | null>;
    listSexs:Loadable<any | null>;
    loading_typeDocumentsMembers:Loadable<any | null>;
    challenge:Loadable<any | null>;
    sexual_orientation:Loadable<any | null>;
    generatePostulation:Loadable<any | null>;
    deleteDocument:Loadable<any | null>;
    inforPostulation:Loadable<any | null>;
    detail_postulation:Loadable<any | null>;
    downaldDocument:Loadable<any | null>;

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
    downaldDocument: {
        value: null,
        loading: false,
        loaded: false,
    },
    detail_postulation: {
        value: null,
        loading: false,
        loaded: false,
    },
    deleteDocument: {
        value: null,
        loading: false,
        loaded: false,
    },
    inforPostulation: {
        value: null,
        loading: false,
        loaded: false,
    },
    generatePostulation: {
        value: null,
        loading: false,
        loaded: false,
    },
    sexual_orientation: {
        value: null,
        loading: false,
        loaded: false,
    },
    challenge: {
        value: null,
        loading: false,
        loaded: false,
    },
    loading_typeDocumentsMembers: {
        value: null,
        loading: false,
        loaded: false,
    },
    addDocument: {
        value: [],
        loading: false,
        loaded: false,
    },
    listSexs: {
        value: null,
        loading: false,
        loaded: false,
    },
    testimonials: {
        value: [],
        loading: false,
        loaded: false,
    },
    postulation: {
        value: null,
        loading: false,
        loaded: false,
    },
    memberPostulation: {
        value: null,
        loading: false,
        loaded: false,
    },
    list_postulations: {
        value: [],
        loading: false,
        loaded: false,
    },
    documentType: {
        value: [],
        loading: false,
        loaded: false,
    },
    numberContact: {
      value: [],
      loading: false,
      loaded: false,
  },
  profile: {
    value: [],
    loading: false,
    loaded: false,
},
};

export const postulationSlice = createSlice({
    name: 'postulation',
    initialState,
    reducers: {
        postulations_default: (state) => {
            state.postulation = {
                value: state.postulation.value,
                loading: true,
                loaded: false,
            };
        },
        postulations_success: (state, action) => {
            state.postulation = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        postulations_fail: (state) => {
            state.postulation = {
                value: initialState.postulation.value,
                loading: false,
                loaded: false,
            };
        },
        members_default: (state) => {
            state.memberPostulation = {
                value: state.memberPostulation.value,
                loading: true,
                loaded: false,
            };
        },
        members_success: (state, action) => {
            state.memberPostulation = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        members_fail: (state) => {
            state.memberPostulation = {
                value: initialState.memberPostulation.value,
                loading: false,
                loaded: false,
            };
        },
        postulations_list_default: (state) => {
            state.list_postulations = {
                value: state.list_postulations.value,
                loading: true,
                loaded: false,
            };
        },
        postulations_list_success: (state, action) => {
            state.list_postulations = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        postulations_list_fail: (state) => {
            state.list_postulations = {
                value: initialState.list_postulations.value,
                loading: false,
                loaded: false,
            };
        },
        loading_typeDocumentsMembers: (state) => {
            state.loading_typeDocumentsMembers = {
                value: state.loading_typeDocumentsMembers.value,
                loading: true,
                loaded: false,
            };
        },
        success_typeDocumentsMembers: (state,action) => {
            state.loading_typeDocumentsMembers = {
                value: action.payload,
                loading: true,
                loaded: false,
            };
        },
        fail_typeDocumentsMembers: (state, action) => {
            state.loading_typeDocumentsMembers = {
                value: state.loading_typeDocumentsMembers.value,
                loading: true,
                loaded: false,
            };
        },
        loading_typeDocuments: (state) => {
            state.documentType = {
                value: state.documentType.value,
                loading: true,
                loaded: false,
            };
        },
     
        success_typeDocuments: (state, action) => {
            state.documentType = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        fail_typeDocuments: (state, action) => {
            state.documentType = {
                value: initialState.documentType.value,
                loading: false,
                loaded: false,
            };
        },
        download_default_Documents: (state) => {
            state.downaldDocument = {
                value: state.downaldDocument.value,
                loading: true,
                loaded: false,
            };
        },
     
        download_success_Documents: (state, action) => {
            state.downaldDocument = {
                value: action.payload,
                loading: false,
                loaded: true,
            };
        },
        download_fail_Documents: (state, action) => {
            state.downaldDocument = {
                value: initialState.downaldDocument.value,
                loading: false,
                loaded: false,
            };
        },
        loading_typeNumberContact: (state) => {
          state.numberContact = {
              value: state.numberContact.value,
              loading: true,
              loaded: false,
          };
      },
      success_typeNumberContact: (state, action) => {
          state.numberContact = {
              value: action.payload,
              loading: false,
              loaded: true,
          };
      },
      fail_typeNumberContact: (state, action) => {
          state.numberContact = {
              value: initialState.numberContact.value,
              loading: false,
              loaded: false,
          };
      },
      loading_profiles: (state) => {
        state.profile = {
            value: state.profile.value,
            loading: true,
            loaded: false,
        };
    },
    success_profiles: (state, action) => {
        state.profile = {
            value: action.payload,
            loading: false,
            loaded: true,
        };
    },
    fail_profiles: (state, action) => {
        state.profile = {
            value: initialState.profile.value,
            loading: false,
            loaded: false,
        };
    },
    listSex_default: (state) => {
        state.listSexs = {
            value: state.listSexs.value,
            loading: true,
            loaded: false,
        };
    },
    listSex_success: (state, action) => {
        state.listSexs = {
            value: action.payload,
            loading: false,
            loaded: true,
        };
    },
    listSex_fail: (state) => {
        state.listSexs = {
            value: initialState.listSexs.value,
            loading: false,
            loaded: false,
        };
    },
    addDoc_default: (state) => {
        state.addDocument = {
            value: state.addDocument.value,
            loading: true,
            loaded: false,
        };
    },
    addDoc_success: (state, action) => {
        state.addDocument = {
            value: [...state.addDocument.value, action.payload],
            loading: false,
            loaded: true,
        };
    },
    deleteDocPost_success: (state, action) => {
        state.addDocument = {
            value: state.addDocument.value.filter((item: any)=> item.id !== action.payload),
            loading: false,
            loaded: true,
        };
    },
    deleteDoc_success: (state, action) => {
        state.deleteDocument = {
            value: action.payload,
            loading: false,
            loaded: true,
        };
    },
    addDoc_fail: (state) => {
        state.addDocument = {
            value: initialState.addDocument.value,
            loading: false,
            loaded: false,
        };
    },
    deleteDoc_default: (state) => {
        state.deleteDocument = {
            value: state.deleteDocument.value,
            loading: true,
            loaded: false,
        };
    },
    deleteDoc_fail: (state) => {
        state.deleteDocument = {
            value: initialState.deleteDocument.value,
            loading: false,
            loaded: false,
        };
    },
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
      sexualOrientation_default: (state) => {
        state.sexual_orientation = {
            value: state.sexual_orientation.value,
            loading: true,
            loaded: false,
        };
    },
    sexualOrientation_success: (state, action) => {
        state.sexual_orientation = {
            value: action.payload,
            loading: false,
            loaded: true,
        };
    },
    sexualOrientation_fail: (state) => {
        state.sexual_orientation = {
            value: initialState.sexual_orientation.value,
            loading: false,
            loaded: false,
        };
    },
    GeneratePostulations_default: (state) => {
        state.generatePostulation = {
            value: state.generatePostulation.value,
            loading: true,
            loaded: false,
        };
    },
    GeneratePostulations_success: (state, action) => {
        state.generatePostulation = {
            value: action.payload,
            loading: false,
            loaded: true,
        };
    },
    GeneratePostulations_fail: (state) => {
        state.generatePostulation = {
            value: initialState.generatePostulation.value,
            loading: false,
            loaded: false,
        };
    },

    infoPostulations_default: (state) => {
        state.inforPostulation = {
            value: state.inforPostulation.value,
            loading: true,
            loaded: false,
        };
    },
    infoPostulations_success: (state, action) => {
        state.inforPostulation = {
            value: action.payload,
            loading: false,
            loaded: true,
        };
    },
    infoPostulations_fail: (state) => {
        state.inforPostulation = {
            value: initialState.inforPostulation.value,
            loading: false,
            loaded: false,
        };
    },
    infoPostulationsdetail_default: (state) => {
        state.detail_postulation = {
            value: state.detail_postulation.value,
            loading: true,
            loaded: false,
        };
    },
    infoPostulationsdetail_success: (state, action) => {
        state.detail_postulation = {
            value: action.payload,
            loading: false,
            loaded: true,
        };
    },
    infoPostulationsdetail_fail: (state) => {
        state.detail_postulation = {
            value: initialState.detail_postulation.value,
            loading: false,
            loaded: false,
        };
    },
   
    },
});

export const {
    postulations_default,
    postulations_success,
    postulations_fail,
    postulations_list_default,
    postulations_list_success,
    postulations_list_fail,
    members_default,
    members_success,
    members_fail,
    loading_typeDocuments,  
    success_typeDocuments,
    loading_typeDocumentsMembers,
    success_typeDocumentsMembers,
    fail_typeDocumentsMembers,
    fail_typeDocuments,
    loading_typeNumberContact,
    success_typeNumberContact,
    fail_typeNumberContact,
    loading_profiles,
    success_profiles,
    fail_profiles,
    listSex_default,
    listSex_success,
    listSex_fail,
    addDoc_default,
    addDoc_success,
    deleteDocPost_success,
    addDoc_fail,
    loading_challenge,
    get_challenge,
    fail_challenge,
    sexualOrientation_default,
    sexualOrientation_success,
    sexualOrientation_fail,
    GeneratePostulations_default,
    GeneratePostulations_success,
    GeneratePostulations_fail,
    deleteDoc_default,
    deleteDoc_success,
    deleteDoc_fail,
    infoPostulations_default,
    infoPostulations_success,
    infoPostulations_fail,
    infoPostulationsdetail_default,
    infoPostulationsdetail_success,
    infoPostulationsdetail_fail,
    download_default_Documents,
    download_success_Documents,
    download_fail_Documents
} = postulationSlice.actions;
