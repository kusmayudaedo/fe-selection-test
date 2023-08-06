import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getBalance } from "./slices";

// @initial state
const INITIAL_STATE = {
  //@loading state
  isGetBalanceLoading: false,

  //@user state
  balance: [],
  totalSalary: "",
};

//@Auth slieces
const employeeManagement = createSlice({
  name: "employeeManagement",
  initialState: INITIAL_STATE,
  extraReducers: {
    //@Get cashier info
    [getBalance.pending]: (state, action) => {
      state.isGetBalanceLoading = true;
    },
    [getBalance.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isGetBalanceLoading: false,
        balance: action.payload?.result,
        totalSalary: action.payload?.totalSalary,
      });
    },
    [getBalance.rejected]: (state, action) => {
      state.isLoginLoading = false;
      state = Object.assign(state, INITIAL_STATE);
    },
  },
});

export default employeeManagement.reducer;
