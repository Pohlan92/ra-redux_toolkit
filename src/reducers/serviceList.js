import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResponse } from '../lib/getResponse';

const initialState = {
  services: [],
  loading: false,
  error: null,
};

export const getServicesAsync = createAsyncThunk(
  'serviceList/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getResponse({
        url: process.env.REACT_APP_API_SERVICES,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const removeServiceAsync = createAsyncThunk(
  'editService/fetchRemoveService',
  async (id, { dispatch }) => {
    try {
      await fetch(`${process.env.REACT_APP_API_SERVICES}/${id}`, {
        method: 'DELETE',
      });
      dispatch(removeService(id));
    } catch {}
  },
);

export const serviceListSlice = createSlice({
  name: 'serviceList',
  initialState,
  reducers: {
    addService: (state, { payload }) => {
      const { id, name, price, content } = payload;
      const newService = { id, name, price: Number(price), content };
      state.services.push(newService);
    },
    removeService: (state, { payload }) => {
      state.services = state.services.filter(
        (service) => service.id !== payload,
      );
    },
    editService: (state, { payload }) => {
      const serviceIndex = state.services.findIndex(
        (service) => service.id === payload.id,
      );
      state.services[serviceIndex] = payload;
    },
  },
  extraReducers: {
    [getServicesAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getServicesAsync.fulfilled]: (state, { payload }) => {
      state.services = payload;
      state.loading = false;
      state.error = null;
    },
    [getServicesAsync.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { addService, removeService, editService } =
  serviceListSlice.actions;

export const serviceListReducer = serviceListSlice.reducer;
