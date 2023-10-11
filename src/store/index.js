import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';

import { serviceListReducer } from '../reducers/serviceList';
import { addServiceReducer } from '../reducers/addService';
import { editServiceReducer } from '../reducers/editService';

export const store = configureStore({
  reducer: {
    serviceList: serviceListReducer,
    addService: addServiceReducer,
    editService: editServiceReducer,
  },
  // middleware: [thunk],
});
