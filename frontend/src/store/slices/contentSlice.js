"use client";
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

export const addContent = createAsyncThunk("/domain/content/domainId",async(formData) => {
    try {
        const response = axiosInstance.post(`/domain/content/`,formData);
        toast.promise(response,{
            loading:"Wait !! while add content",
            success:(data) => {
                // console.log("dat",data);
                return data?.data?.message;
            },
            error:"Failed to add content"
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const deleteContent = createAsyncThunk('domain/content/contentId',async (contentId) => {
    try {
        const response = axiosInstance.delete(`/domain/content/${contentId}`);
        toast.promise(response,{
            loading:"Wait !! deleting content",
            success:(data) => {
                // console.log("dat",data);
                return data?.data?.message;
            },
            error:"Failed to delete content"
        })
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})


export const updateContent = createAsyncThunk('/domain/content/contentId',async({contentId,editContentData}) => {
    try {
        const response = axiosInstance.put(`/domain/content/${contentId}`,editContentData);
        toast.promise(response,{
            loading:"Wait !! while updating content",
            success:(data) => {
                return data?.data?.message;
            },
            error:"Failed to update content"
        })
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