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

// Fetch Appointments
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const appointments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return appointments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Appointment
export const addAppointment = createAsyncThunk(
  'appointments/addAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'appointments'), appointmentData);
      await updateDoc(docRef, { id: docRef.id });
      const newAppointment = { id: docRef.id, ...appointmentData };
      return newAppointment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Appointment
export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (appointmentId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'appointments', appointmentId));
      return appointmentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Appointment
export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async ({ id, appointmentData }, { rejectWithValue }) => {
    try {

      const appointmentRef = doc(db, 'appointments', id);
      await updateDoc(appointmentRef, appointmentData);
      const updatedAppointment = { id, ...appointmentData };
  
      return updatedAppointment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Appointments
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;

      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

    // Add Appointment
    builder
      .addCase(addAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments.unshift(action.payload); // Changed to unshift for most recent at top
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

    // Delete Appointment
    builder
      .addCase(deleteAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload);
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });

    // Update Appointment
    builder
      .addCase(updateAppointment.pending, (state) => {
        // Update ke liye global loading state set nahi karte
        // Individual button loading component level par handle karenge
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.appointments.findIndex(appointment => appointment.id === action.payload.id);
        if (index !== -1) {
          // Existing appointment ko update karo instead of remove/add
          state.appointments[index] = { ...state.appointments[index], ...action.payload };
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default appointmentSlice.reducer;