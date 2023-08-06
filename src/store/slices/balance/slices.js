import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

//@Get employee Info async thunk function
export const getBalance = createAsyncThunk(
  "balance/getBalance",
  async (payload, { rejectWithValue }) => {
    try {
      // @generate parameter
      const { id, sort } = payload;

      const PARAMETER = `id=${id}&sort=${sort}`;
      const { data } = await api.get(
        "/balance?" + encodeURI(PARAMETER)
      );
      return data;
    } catch (error) {
      Toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.err);
    }
  }
);
