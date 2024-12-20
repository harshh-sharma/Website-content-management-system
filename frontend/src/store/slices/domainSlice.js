"use client";

import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

export const getAllDomains = createAsyncThunk("/domain/",async () => {
  try {
    // console.log("yes");
     const response = axiosInstance.get("/domain");
     toast.promise(response,{
      loading:"loading domains",
      success:"domains loaded successfully",
      error:"failed to get the domains"
     })
     return (await response).data.websiteDomain;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})

export const updateDomain = createAsyncThunk("/domain/domainId",async ({domainId,data}) => {
  try {
    console.log("datauu",data);
    
    const response = axiosInstance.put(`/domain/${domainId}`,data);
    toast.promise(response,{
      loading:"wait, while updating domain",
      success:"domain successfully updated",
      error:"failed to update domain"
    })
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
})

export const addWebsite = createAsyncThunk('/domain',async(data) => {
  try {
    const response = axiosInstance.post('/domain',data);
    toast.promise(response,{
      loading:"wait,domain creation started",
      success:(data) => {
        return data?.data?.message;
    },
      error:"failed to create domain"
    })
    return (await response).data;
  } catch (error) {
    console.log(error?.response?.data);
    toast.error(error?.response?.data?.message);
  }
})

export const deleteWebsite = createAsyncThunk('/domain/domainId',async(domainId) => {
  try {
    const response = axiosInstance.delete(`/domain/${domainId}`);
    toast.promise(response,{
      loading:"wait,domain deletion started",
      success:"domain successfully deleted",
      error:"failed to delete domain"
    })
    return (await response).data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data);
  }
})


const domainSlice = createSlice({
    name:"domain",
    initialState:{
        domains:[]
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDomains.fulfilled ,(state,action) => {
                if(action.payload){
                    state.domains = [...action.payload];
                }
            })
    }
});

// export const {} = courseSlice.actions;
export default domainSlice.reducer;