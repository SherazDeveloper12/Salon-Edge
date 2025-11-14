import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../../config/firestore'; // Adjust path to your firebase.js file

// Fetch Services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    const querySnapshot = await getDocs(collection(db, 'services'));
    const services = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return services;
  }
);

// Add Service
export const addService = createAsyncThunk(
  'services/addService',
  async (serviceData) => {
    const docRef = await addDoc(collection(db, 'services'), serviceData);
    // Update the document to include the id in the data
    await updateDoc(docRef, { id: docRef.id });
    return { id: docRef.id, ...serviceData };
  }
);

// Delete Service
export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (serviceId) => {
    await deleteDoc(doc(db, 'services', serviceId));
    return serviceId;
  }
);

// Update Service
export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, serviceData }) => {
    const serviceRef = doc(db, 'services', id);
    await updateDoc(serviceRef, serviceData);
    return { id, ...serviceData };
  }
);

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Services
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Add Service
    builder
      .addCase(addService.pending, (state) => {
        // Individual loading state component level par handle karenge
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services.push(action.payload);
      })
      .addCase(addService.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Delete Service
    builder
      .addCase(deleteService.pending, (state) => {
        // Individual loading state component level par handle karenge
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.services = state.services.filter(service => service.id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Update Service
    builder
      .addCase(updateService.pending, (state) => {
        // Individual loading state component level par handle karenge
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.services.findIndex(service => service.id === action.payload.id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default serviceSlice.reducer;