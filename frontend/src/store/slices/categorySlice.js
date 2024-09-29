// store/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://productlisting-ra0j.onrender.com/api/products';

// Async thunk to fetch categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data; // Return categories array
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    selectedCategory: '',
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload; // Populate categories in state
    });
  },
});

export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
