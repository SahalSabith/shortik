import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://shortik.onrender.com/api";

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
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(qrGenerator.fulfilled, (state, action) => {
        state.qrCode = action.payload.qr_url;
      })
      .addCase(urlShort.fulfilled, (state, action) => {
        state.short_url = action.payload.short_url;
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        const qrCodesArray = Array.isArray(action.payload.qr_code) 
            ? action.payload.qr_code 
            : [action.payload.qr_code];
    
        state.urls = [...state.urls, ...action.payload.urls];
        state.qrCodes = [...state.qrCodes, ...qrCodesArray];
      });
  },
});

export const { addUrl } = urlSlice.actions;
export default urlSlice.reducer;