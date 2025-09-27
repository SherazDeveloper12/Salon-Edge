import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../../config/firestore'; // Ensure this path is correct

// Fetch Stylists
export const fetchStylists = createAsyncThunk(
  'stylists/fetchStylists',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'stylists'));
      const stylists = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Fetched Stylists from Firestore:", stylists); // Debugging log
      return stylists;
    } catch (error) {
      console.error('Fetch Stylists Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Add Stylist
export const addStylist = createAsyncThunk(
  'stylists/addStylist',
  async (stylistData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'stylists'), stylistData);
      await updateDoc(docRef, { id: docRef.id });
      const newStylist = { id: docRef.id, ...stylistData };
      console.log('Added Stylist:', newStylist); // Debugging log
      return newStylist;
    } catch (error) {
      console.error('Add Stylist Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Delete Stylist
export const deleteStylist = createAsyncThunk(
  'stylists/deleteStylist',
  async (stylistId, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'stylists', stylistId));
      console.log('Deleted Stylist ID:', stylistId); // Debugging log
      return stylistId;
    } catch (error) {
      console.error('Delete Stylist Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Update Stylist
export const updateStylist = createAsyncThunk(
  'stylists/updateStylist',
  async ({ id, stylistData }, { rejectWithValue }) => {
    try {
      const stylistRef = doc(db, 'stylists', id);
      await updateDoc(stylistRef, stylistData);
      const updatedStylist = { id, ...stylistData };
      console.log('Updated Stylist:', updatedStylist); // Debugging log
      return updatedStylist;
    } catch (error) {
      console.error('Update Stylist Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const stylistSlice = createSlice({
  name: 'stylists',
  initialState: {
    stylists: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Stylists
    builder
      .addCase(fetchStylists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStylists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stylists = action.payload;
     
      })
      .addCase(fetchStylists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message; // Use payload from rejectWithValue
     
      });

    // Add Stylist
    builder
      .addCase(addStylist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addStylist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stylists.push(action.payload);
      })
      .addCase(addStylist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message; // Use payload from rejectWithValue
      });

    // Delete Stylist
    builder
      .addCase(deleteStylist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteStylist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stylists = state.stylists.filter(stylist => stylist.id !== action.payload);
      })
      .addCase(deleteStylist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message; // Use payload from rejectWithValue
      });

    // Update Stylist
    builder
      .addCase(updateStylist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStylist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.stylists.findIndex(stylist => stylist.id === action.payload.id);
        if (index !== -1) {
          state.stylists[index] = action.payload;
        }
      })
      .addCase(updateStylist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message; // Use payload from rejectWithValue
      });
  },
});

export default stylistSlice.reducer;