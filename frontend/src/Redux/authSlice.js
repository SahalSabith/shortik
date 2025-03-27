import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";
const storedUser = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
    "auth/register",
    async (userData,{rejectWithValue}) => {
        try{
            const response = await axios.post(`${API_URL}/register/`,userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Registration failed");
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (userData,{rejectWithValue}) => {
        try{
            const response = await axios.post(`${API_URL}/login/`,userData);
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
)

export const userDeatils = createAsyncThunk(
  "auth/userDetails",
  async (_,{getState,rejectWithValue}) => {
    try{
      const token = getState().auth.token || localStorage.getItem("token");
      
      if (!token) {
        return rejectWithValue("No authentication token found.");
      }

      const response = await axios.get(`${API_URL}/user-details/`,{
        headers:{
          Authorization: `Token ${token}`,
        }
      });
      return response.data
    }catch (error) {
        return rejectWithValue(error.response?.data || "User Fetching failed");
    }
  }
)

const initialState = {
  username: storedUser?.username || null,
  email: storedUser?.email || null,
  token: localStorage.getItem("token") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userDeatils.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.username = action.payload.username;
        state.email = action.payload.email;
        localStorage.setItem("user", JSON.stringify({ username: action.payload.username, email: action.payload.email }));
      })      
      .addCase(userDeatils.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
