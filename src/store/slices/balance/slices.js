import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

//@Get employee Info async thunk function
export const getBalance = createAsyncThunk(
  "balance/getBalance",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { startDate, endDate, sort = "DESC" } = payload;

      const PARAMETER = `start=${startDate}&end=${endDate}&sort=${sort}`;
      const { data } = await api.get("/balance?" + encodeURI(PARAMETER));
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);
