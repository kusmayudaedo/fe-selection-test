import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import {
  getEmployeeInfo,
  changeEmployeeStatus,
  registerEmployee,
} from "./slices";

// @initial state
const INITIAL_STATE = {
  //@loading state
  isGetEmployeeInfoLoading: false,
  isChangeEmployeeStatusLoading: false,
  isRegisterEmployeeLoading: false,

  //@user state
  allEmployee: [],

  //@Pagination
  currentPage: 1,
  totalPages: "",
};

//@Auth slieces
const employeeManagement = createSlice({
  name: "employeeManagement",
  initialState: INITIAL_STATE,
  extraReducers: {
    //@Get cashier info
    [getEmployeeInfo.pending]: (state, action) => {
      state.isGetEmployeeInfoLoading = true;
    },
    [getEmployeeInfo.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isGetEmployeeInfoLoading: false,
        allEmployee: action.payload?.result,
        currentPage: action.payload?.currentPage,
        totalPages: action.payload?.totalPages,
      });
    },
    [getEmployeeInfo.rejected]: (state, action) => {
      state.isLoginLoading = false;
      state = Object.assign(state, INITIAL_STATE);
    },

    [changeEmployeeStatus.pending]: (state, action) => {
      state.isGetEmployeeInfoLoading = true;
    },
    [changeEmployeeStatus.fulfilled]: (state, action) => {
      state.isGetEmployeeInfoLoading = false;
    },
    [changeEmployeeStatus.rejected]: (state, action) => {
      state.isGetEmployeeInfoLoading = true;
    },

    [registerEmployee.pending]: (state, action) => {
      state.isRegisterEmployeeLoading = true;
    },
    [registerEmployee.fulfilled]: (state, action) => {
      state.isRegisterEmployeeLoading = false;
    },
    [registerEmployee.rejected]: (state, action) => {
      state.isRegisterEmployeeLoading = true;
    },
  },
});

export default employeeManagement.reducer;
