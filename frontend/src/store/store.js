import { configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/authSlice.js';
import domainReducer from './slices/domainSlice.js';
import contentReducer from './slices/contentSlice.js'

const appStore = configureStore({
   reducer: {
    auth:authReducer,
    websites:domainReducer,
    contents:contentReducer
   },
   devTools:true
})

export default appStore;