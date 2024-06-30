import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} = customerSlice.actions;

export default customerSlice.reducer;

// const userSlice = createSlice({
//   name: "user",
//   initialState: { user: {}, loading: false, isAuthenticated: false, error: null },
//   reducers: {
//     loginRequest: (state) => {
//       state.loading = true;
//       state.isAuthenticated = false;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//     },
//     loginFail: (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.user = null;
//       state.error = action.payload;
//     },
//     logoutSuccess: (state) => {
//       state.loading = false;
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//     logoutFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// const profileSlice = createSlice({
//   name: "profile",
//   initialState: {},
//   reducers: {
//     updateProfileRequest: (state) => {
//       state.loading = true;
//     },
//     updateProfileSuccess: (state, action) => {
//       state.loading = false;
//       state.isUpdated = action.payload;
//     },
//     updateProfileFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     updateProfileReset: (state) => {
//       state.isUpdated = false;
//     },
//     updateUserRequest: (state) => {
//       state.loading = true;
//     },
//     updateUserSuccess: (state, action) => {
//       state.loading = false;
//       state.isUpdated = action.payload;
//     },
//     updateUserFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     updateUserReset: (state) => {
//       state.isUpdated = false;
//     },
//     deleteUserRequest: (state) => {
//       state.loading = true;
//     },
//     deleteUserSuccess: (state, action) => {
//       state.loading = false;
//       state.isDeleted = action.payload.success;
//       state.message = action.payload.message;
//     },
//     deleteUserFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     deleteUserReset: (state) => {
//       state.isDeleted = false;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// const forgotPasswordSlice = createSlice({
//   name: "forgotPassword",
//   initialState: {},
//   reducers: {
//     forgotPasswordRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     forgotPasswordSuccess: (state, action) => {
//       state.loading = false;
//       state.message = action.payload;
//     },
//     forgotPasswordFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// const allUsersSlice = createSlice({
//   name: "allUsers",
//   initialState: { users: [] },
//   reducers: {
//     allUsersRequest: (state) => {
//       state.loading = true;
//     },
//     allUsersSuccess: (state, action) => {
//       state.loading = false;
//       state.users = action.payload;
//     },
//     allUsersFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// const userDetailsSlice = createSlice({
//   name: "userDetails",
//   initialState: { user: {} },
//   reducers: {
//     userDetailsRequest: (state) => {
//       state.loading = true;
//     },
//     userDetailsSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//     },
//     userDetailsFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// export const {
//   loginRequest,
//   loginSuccess,
//   loginFail,
//   logoutSuccess,
//   logoutFail,
//   clearErrors,
// } = userSlice.actions;

// export const {
//   updateProfileRequest,
//   updateProfileSuccess,
//   updateProfileFail,
//   updateProfileReset,
//   updateUserRequest,
//   updateUserSuccess,
//   updateUserFail,
//   updateUserReset,
//   deleteUserRequest,
//   deleteUserSuccess,
//   deleteUserFail,
//   deleteUserReset,
//   clearErrors: clearProfileErrors,
// } = profileSlice.actions;

// export const {
//   forgotPasswordRequest,
//   forgotPasswordSuccess,
//   forgotPasswordFail,
//   clearErrors: clearForgotPasswordErrors,
// } = forgotPasswordSlice.actions;

// export const {
//   allUsersRequest,
//   allUsersSuccess,
//   allUsersFail,
//   clearErrors: clearAllUsersErrors,
// } = allUsersSlice.actions;

// export const {
//   userDetailsRequest,
//   userDetailsSuccess,
//   userDetailsFail,
//   clearErrors: clearUserDetailsErrors,
// } = userDetailsSlice.actions;

// export const userReducer = userSlice.reducer;
// export const profileReducer = profileSlice.reducer;
// export const forgotPasswordReducer = forgotPasswordSlice.reducer;
// export const allUsersReducer = allUsersSlice.reducer;
// export const userDetailsReducer = userDetailsSlice.reducer;
