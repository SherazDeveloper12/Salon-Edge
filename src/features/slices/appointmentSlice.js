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
      console.log("Fetched Appointments from Firestore:", appointments); // Debugging log
      return appointments;
    } catch (error) {
      console.error('Fetch Appointments Error:', error.message);
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
      console.log('Added Appointment:', newAppointment); // Debugging log
      return newAppointment;
    } catch (error) {
      console.error('Add Appointment Error:', error.message);
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
      console.log('Deleted Appointment ID:', appointmentId); // Debugging log
      return appointmentId;
    } catch (error) {
      console.error('Delete Appointment Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Update Appointment
export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async ({ id, appointmentData }, { rejectWithValue }) => {
    try {
      console.log('Update Appointment Thunk Called'); // Debugging log
      console.log('Updating Appointment ID:', id, 'with data:', appointmentData); // Debugging log
      const appointmentRef = doc(db, 'appointments', id);
      await updateDoc(appointmentRef, appointmentData);
      const updatedAppointment = { id, ...appointmentData };
      console.log('Updated Appointment:', updatedAppointment); // Debugging log
      return updatedAppointment;
    } catch (error) {
      console.error('Update Appointment Error:', error.message);
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
        console.log("Fetched Appointments:", action.payload); // Debugging log
        console.log("Appointments State After Fetch:", state.appointments); // Debugging log
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
        state.appointments.push(action.payload);
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
        state.status = 'loading';
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.appointments.findIndex(appointment => appointment.id === action.payload.id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default appointmentSlice.reducer;