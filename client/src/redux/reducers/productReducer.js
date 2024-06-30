import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Increment by 1
    },
    decrement: (state) => {
      state.value -= 1; // Decrement by 1
    },
    setQuantitytoAdd: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setQuantitytoAdd } = productSlice.actions;

export default productSlice.reducer;

// const productsSlice = createSlice({
//   name: "products",
//   initialState: { products: [], loading: false, error: null },
//   reducers: {
//     getAllProductsRequest: (state) => {
//       state.loading = true;
//     },
//     getAllProductsSuccess: (state, action) => {
//       state.loading = false;
//       state.products = action.payload.products;
//       state.productsCount = action.payload.productsCount;
//       state.resultPerPage = action.payload.resultPerPage;
//       state.filteredProductsCount = action.payload.filteredProductsCount;
//     },
//     getAllProductsFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// const newProductSlice = createSlice({
//   name: "newProduct",
//   initialState: { product: {}, loading: false, success: false, error: null },
//   reducers: {
//     newProductRequest: (state) => {
//       state.loading = true;
//     },
//     newProductSuccess: (state, action) => {
//       state.loading = false;
//       state.success = action.payload.success;
//       state.product = action.payload.product;
//     },
//     newProductFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     newProductReset: (state) => {
//       state.success = false;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// const productSlice = createSlice({
//   name: "product",
//   initialState: {
//     loading: false,
//     isDeleted: false,
//     isUpdated: false,
//     error: null,
//   },
//   reducers: {
//     deleteProductRequest: (state) => {
//       state.loading = true;
//     },
//     deleteProductSuccess: (state, action) => {
//       state.loading = false;
//       state.isDeleted = action.payload;
//     },
//     deleteProductFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     deleteProductReset: (state) => {
//       state.isDeleted = false;
//     },
//     updateProductRequest: (state) => {
//       state.loading = true;
//     },
//     updateProductSuccess: (state, action) => {
//       state.loading = false;
//       state.isUpdated = action.payload;
//     },
//     updateProductFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     updateProductReset: (state) => {
//       state.isUpdated = false;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// const productDetailsSlice = createSlice({
//   name: "productDetails",
//   initialState: { product: {}, loading: false, error: null },
//   reducers: {
//     getProductDetailsRequest: (state) => {
//       state.loading = true;
//     },
//     getProductDetailsSuccess: (state, action) => {
//       state.loading = false;
//       state.product = action.payload;
//     },
//     getProductDetailsFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// const newReviewSlice = createSlice({
//   name: "newReview",
//   initialState: { loading: false, success: false, error: null },
//   reducers: {
//     newReviewRequest: (state) => {
//       state.loading = true;
//     },
//     newReviewSuccess: (state, action) => {
//       state.loading = false;
//       state.success = action.payload;
//     },
//     newReviewFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     newReviewReset: (state) => {
//       state.success = false;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// const productReviewsSlice = createSlice({
//   name: "productReviews",
//   initialState: { reviews: [], loading: false, error: null },
//   reducers: {
//     getAllReviewsRequest: (state) => {
//       state.loading = true;
//     },
//     getAllReviewsSuccess: (state, action) => {
//       state.loading = false;
//       state.reviews = action.payload;
//     },
//     getAllReviewsFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// const reviewSlice = createSlice({
//   name: "review",
//   initialState: { loading: false, isDeleted: false, error: null },
//   reducers: {
//     deleteReviewRequest: (state) => {
//       state.loading = true;
//     },
//     deleteReviewSuccess: (state, action) => {
//       state.loading = false;
//       state.isDeleted = action.payload;
//     },
//     deleteReviewFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     deleteReviewReset: (state) => {
//       state.isDeleted = false;
//     },
//     clearErrors: (state) => {
//       state.error = null;
//     },
//   },
// });

// export const {
//   getAllProductsRequest,
//   getAllProductsSuccess,
//   getAllProductsFail,
//   clearErrors,
// } = productsSlice.actions;

// export const {
//   newProductRequest,
//   newProductSuccess,
//   newProductFail,
//   newProductReset,
//   clearErrors: clearNewProductErrors,
// } = newProductSlice.actions;

// export const {
//   deleteProductRequest,
//   deleteProductSuccess,
//   deleteProductFail,
//   deleteProductReset,
//   updateProductRequest,
//   updateProductSuccess,
//   updateProductFail,
//   updateProductReset,
//   clearErrors: clearProductErrors,
// } = productSlice.actions;

// export const {
//   getProductDetailsRequest,
//   getProductDetailsSuccess,
//   getProductDetailsFail,
//   clearErrors: clearProductDetailsErrors,
// } = productDetailsSlice.actions;

// export const {
//   newReviewRequest,
//   newReviewSuccess,
//   newReviewFail,
//   newReviewReset,
//   clearErrors: clearNewReviewErrors,
// } = newReviewSlice.actions;

// export const {
//   getAllReviewsRequest,
//   getAllReviewsSuccess,
//   getAllReviewsFail,
//   clearErrors: clearProductReviewsErrors,
// } = productReviewsSlice.actions;

// export const {
//   deleteReviewRequest,
//   deleteReviewSuccess,
//   deleteReviewFail,
//   deleteReviewReset,
//   clearErrors: clearReviewErrors,
// } = reviewSlice.actions;

// export const productsReducer = productsSlice.reducer;
// export const newProductReducer = newProductSlice.reducer;
// export const productReducer = productSlice.reducer;
// export const productDetailsReducer = productDetailsSlice.reducer;
// export const newReviewReducer = newReviewSlice.reducer;
// export const productReviewsReducer = productReviewsSlice.reducer;
// export const reviewReducer = reviewSlice.reducer;
