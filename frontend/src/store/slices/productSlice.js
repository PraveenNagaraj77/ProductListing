import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, skip, limit }) => {
    const url = category
      ? `${BASE_URL}/category/${category}?skip=${skip}&limit=${limit}`
      : `${BASE_URL}?skip=${skip}&limit=${limit}`;

    const response = await axios.get(url);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    skip: 0,
    totalProducts: 0,
    currentPage: 1,
    limit: 10,
  },
  reducers: {
    increaseSkip: (state) => {
      state.skip += state.limit;
    },
    resetProducts: (state) => {
      state.products = [];
      state.skip = 0;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.skip = (action.payload - 1) * state.limit;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      const { products, total } = action.payload;
      state.products = products;
      state.totalProducts = total;
    });
  },
});

export const { increaseSkip, resetProducts, setCurrentPage } = productSlice.actions;

export default productSlice.reducer;
