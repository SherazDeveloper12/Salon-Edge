import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firestore";
import { addDoc, collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const userdetails = await getDoc(doc(db, "users", uid));
            const loginedUser = userdetails?.data();
            dispatch(setUser(loginedUser));
            resolve(loginedUser); // Resolve with user data
          } else {
            dispatch(setUser(null));
            resolve(null); // Resolve with null if no user
          }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk(
  "signup",
  async (user) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      let userdetails = {
        name: user.name,
        email: user.email,
        uid: userCredential.user.uid,
      };
      await setDoc(doc(db, "users", userCredential.user.uid), userdetails);
      return userdetails;
    } catch (error) {
      throw error; // Throw to handle in rejected case
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (user) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
      const userdetails = await getDoc(doc(db, "users", userCredential.user.uid));
      const userdata = userdetails?.data();
      return { email: user.email, password: user.password, ...userdata }; // Return login data
    } catch (error) {
      throw error; // Throw to handle in rejected case
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async () => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      throw error; // Throw to handle in rejected case
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedUserData) => {
    try {
      const userRef = doc(db, "users", updatedUserData.uid);
      // Get current user data from Firestore
      const userDoc = await getDoc(userRef);
      const currentUserData = userDoc.data() || {};
      // Merge existing data with updates (soft update)
      const updatedData = { ...currentUserData, ...updatedUserData };
      // Update Firestore
      const docRef = doc(db, "users", updatedUserData.uid);
      await updateDoc(docRef, updatedData);
      // Update Redux state
      return updatedData;
    } catch (error) {
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    User: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.status = 'succeeded';
      state.User = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.User = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.User = { email: action.payload.email,  ...action.payload }; // Sync with login data
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.User = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.User = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.User = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const { setUser } = authSlice.actions;