import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getAttendanceLog = createAsyncThunk(
  "attendance/getAttendanceLog",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/attendance/log");
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const clockIn = createAsyncThunk(
  "attendance/clockIn",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/attendance/clock-in", payload);
      Toast.success(data?.message);
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const clockOut = createAsyncThunk(
  "attendance/clockOut",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/attendance/clock-out", payload);
      Toast.success(data?.message);
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const filterAttendance = createAsyncThunk(
  "attendance/filterAttendance",
  async (payload, { rejectWithValue }) => {
    try {
      const { startDate, endDate } = payload;
      const { data } = await api.get(
        `/attendance?start=${startDate}&end=${endDate}`
      );
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);
