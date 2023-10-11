import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getResponse } from '../lib/getResponse';
import { addService } from './serviceList';
import { resetEditForm } from './editService';

const initialState = {
  service: {
    name: '',
    price: '',
    content: '',
  },
  loading: false,
  error: null,
};

export const addServiceAsync = createAsyncThunk(
  'addService/fetchAddService',
  async ({ service, history }, { dispatch, rejectWithValue }) => {
    try {
      const data = await getResponse({
        url: `${process.env.REACT_APP_API_SERVICES}`,
        method: 'POST',
        data: service,
      });
      dispatch(addService(data));
      dispatch(resetEditForm());
      history.push(process.env.REACT_APP_HOMEPAGE);
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const addServiceSlice = createSlice({
  name: 'addService',
  initialState,
  reducers: {
    changeAddServiceField: (state, { payload }) => {
      const { name, value } = payload;
      state.service[name] = value;
    },
  },
  extraReducers: {
    [addServiceAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addServiceAsync.fulfilled]: (state) => {
      state.service = initialState.service;
      state.loading = false;
      state.error = null;
    },
    [addServiceAsync.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { changeAddServiceField } = addServiceSlice.actions;

export const addServiceReducer = addServiceSlice.reducer;
