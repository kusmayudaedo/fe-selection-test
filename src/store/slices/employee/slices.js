import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

//@Get employee Info async thunk function
export const getEmployeeInfo = createAsyncThunk(
  "employeeManagement/getEmployeeInfo",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { status, sort, page } = payload;

      const PARAMETER = `status=${status}&sort=${sort}&page=${page}`;
      const { data } = await api.get(
        "/employee-management?" + encodeURI(PARAMETER)
      );
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

//@Change employee status async thunk function
export const changeEmployeeStatus = createAsyncThunk(
  "employeeManagement/changeEmployeeStatus",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { id, status } = payload;

      const { data } = await api.patch(
        `/employee-management/${id}?status=${status}`
      );
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "employeeManagement/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { id, profile } = payload;
      const { data } = await api.put(`/employee-management/${id}`, profile);
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);

export const registerEmployee = createAsyncThunk(
  "employeeManagement/registerEmployee",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { data } = await api.post(`/employee-management/`, payload);
      Toast.success(data.message);
      return data.data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);
