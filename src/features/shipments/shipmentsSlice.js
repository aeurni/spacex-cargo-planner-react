import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SHIPMENTS_API_ENDPOINT =
  'https://bitbucket.org/artur_cation/spacex-cargo-planner/raw/1a9e1c0ff090a114999c47b7e9388fbc88bd083b/shipments.json';

const initialState = {
  shipments: JSON.parse(localStorage.getItem('shipments')) || [],
  selectedShipment: { id: '', name: '', email: '', boxes: '' },
  status: null,
};

export const fetchShipments = createAsyncThunk(
  'shipments/fetchShipments',
  async () => {
    return await axios.get(SHIPMENTS_API_ENDPOINT).then(({ data }) => {
      localStorage.setItem('shipments', JSON.stringify(data));

      return data;
    });
  }
);

export const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    getLocalShipments: (state) => {
      state.shipments = JSON.parse(localStorage.getItem('shipments')) || [];
    },
    findShipment: (state, action) => {
      const selectedShipment = state.shipments.find(
        (item) => item.id === action.payload
      );

      if (selectedShipment) {
        state.selectedShipment = selectedShipment;
        state.status = 'resolved';
      } else {
        state.status = 'rejected';
      }
    },
    filterShipmentsByName: (state, action) => {
      const shipments = state.shipments.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.shipments = shipments;
    },
    updateShipmentBoxes: (state, action) => {
      state.selectedShipment.boxes = action.payload.boxes;

      const shipment = state.shipments.find(
        (item) => item.id === action.payload.id
      );

      if (shipment) {
        shipment.boxes = state.selectedShipment.boxes;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.shipments = action.payload;
      })
      .addCase(fetchShipments.rejected, (state) => {
        state.status = 'rejected';
      });
  },
});

export const {
  getLocalShipments,
  setLocalShipments,
  updateShipmentBoxes,
  filterShipmentsByName,
  findShipment,
} = shipmentsSlice.actions;

export default shipmentsSlice.reducer;
