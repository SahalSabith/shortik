import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const qrGenerator = createAsyncThunk(
    "url/qrGenerator",
    async (url,{getState,rejectWithValue}) => {
        try{
            const token = getState().auth.token || localStorage.getItem("token");

            if (!token) {
                return rejectWithValue("No authentication token found.");
            }

            const response = await axios.post(`${API_URL}/qr-generate/`,{url},{
                headers:{
                    Authorization: `Token ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Qr Genrations failed");
        }
    }
)

export const urlShort = createAsyncThunk(
    "url/urlShort",
    async (url,{getState,rejectWithValue}) => {
        try{
            const token = getState().auth.token || localStorage.getItem("token");

            if (!token) {
                return rejectWithValue("No authentication token found.");
            }

            const response = await axios.post(`${API_URL}/short-url/`,{"original_url":url},{
                headers:{
                    Authorization: `Token ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Url shortening failed");
        }
    }
)

export const fetchUrls = createAsyncThunk(
  "url/fetchUrls",
  async (_,{getState,rejectWithValue}) => {
    try{
      const token = getState().auth.token || localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No authentication token found.");
      }

      const response = await axios.get(`${API_URL}/urls/`,{
        headers:{
          Authorization: `Token ${token}`,
        }
      });
      return response.data
    } catch (error){
      return rejectWithValue(error.response?.data || "Urls Fetching failed");
    }
  }
)

const initialState = {
    qrCode:null,
    short_url:null,
    qrCodes : [],
    urls:[],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(qrGenerator.pending, (state) => {
        state.status = "loading";
      })
      .addCase(qrGenerator.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.qrCode = action.payload.qr_url;
      })
      .addCase(qrGenerator.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(urlShort.pending, (state) => {
        state.status = "loading";
      })
      .addCase(urlShort.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.short_url = action.payload.short_url;
      })
      .addCase(urlShort.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUrls.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        state.status = "succeeded";
        const qrCodesArray = Array.isArray(action.payload.qr_code) 
            ? action.payload.qr_code 
            : [action.payload.qr_code];
    
        state.urls = [...state.urls, ...action.payload.urls];
        state.qrCodes = [...state.qrCodes, ...qrCodesArray];
      })         
      .addCase(fetchUrls.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addUrl } = urlSlice.actions;
export default urlSlice.reducer;