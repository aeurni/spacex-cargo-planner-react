import { configureStore } from '@reduxjs/toolkit';
import shipmentsReducer from '../features/shipments/shipmentsSlice';

export default configureStore({
  reducer: {
    shipments: shipmentsReducer,
  },
});
