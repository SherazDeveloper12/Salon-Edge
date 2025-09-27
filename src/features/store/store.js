import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "../slices/appointmentSlice";
import authReducer from "../slices/authslice";
import servicesReducer from "../slices/servicesSlice";
import stylistSliceReducer from "../slices/stylistSlice";
export const store = configureStore(
    {
        reducer:{
            services: servicesReducer,
            stylists: stylistSliceReducer,
            appointments: appointmentReducer,
            auth: authReducer,
        },
    }
)