import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/authslice";
import servicesReducer from "../slices/servicesSlice";
import stylistSliceReducer from "../slices/stylistSlice";
export const store = configureStore(
    {
        reducer:{
            services: servicesReducer,
          
            stylists: stylistSliceReducer,
            
            auth: authReducer,  
           
        },
    }
)