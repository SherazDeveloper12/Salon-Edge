import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firestore";
import { addDoc, collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (_, { dispatch, rejectWithValue }) => {
    console.log("getCurrentUser called");
    try {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            const userdetails = await getDoc(doc(db, "users", uid));
            const loginedUser = userdetails?.data();
            console.log("Current user", loginedUser?.name);
            dispatch(setUser(loginedUser));
            resolve(loginedUser); // Resolve with user data
          } else {
            console.log("There is no current user");
            dispatch(setUser(null));
            resolve(null); // Resolve with null if no user
          }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
      });
    } catch (error) {
      console.log(error);
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
      console.log("error jo hai",error.message);
      throw error; // Throw to handle in rejected case
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async (user) => {
    try {
      console.log("user from authslice", user);
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
      const userdetails = await getDoc(doc(db, "users", userCredential.user.uid));
      const userdata = userdetails?.data();
      console.log("User that is logged in", userdata);
      return { email: user.email, password: user.password, ...userdata }; // Return login data
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log("Current user data in updating dispatch =>", currentUserData);
      // Merge existing data with updates (soft update)
      const updatedData = { ...currentUserData, ...updatedUserData };
      console.log("Updated data in updating dispatch =>", updatedData);
      // Update Firestore
      const docRef = doc(db, "users", updatedUserData.uid);
      await updateDoc(docRef, updatedData);
      console.log("User profile updated in Firestore:", updatedData);
      // Update Redux state
      return updatedData;
    } catch (error) {
      console.error("Error updating user profile:", error);
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
        console.log("User from signup slice", action.payload);
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
        console.log("User from login slice", action.payload);
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