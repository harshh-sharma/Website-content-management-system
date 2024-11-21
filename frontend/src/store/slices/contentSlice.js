import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";
import assert from "assert";

export const getAllContentsRelatedToDomain = createAsyncThunk("/domain/content/",async (Id) => {
  try {
    // console.log("yes");
     const response = axiosInstance.get(`/domain/${Id}`);
     toast.promise(response,{
      loading:"loading contents",
      success:"contents loaded successfully",
      error:"failed to get the contents"
     })
     return (await response).data.contents;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})

const contentSlice = createSlice({
    name:"contents",
    initialState:{
        contents:[]
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getAllContentsRelatedToDomain.fulfilled ,(state,action) => {
                if(action.payload){
                    state.contents = [...action.payload];
                }
            })
    }
});

// export const {} = courseSlice.actions;
export default contentSlice.reducer;