import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getAttendanceLog, filterAttendance } from "./slices";

// @initial state
const INITIAL_STATE = {
  //@loading state
  isGetAttendanceLogLoading: false,
  isFilterAttendanceLoading: false,

  //@user state
  attendanceLog: [],

  todayAttendance: [],
};

//@Auth slieces
const attendance = createSlice({
  name: "attendance",
  initialState: INITIAL_STATE,
  extraReducers: {
    //@Get attendace log info
    [getAttendanceLog.pending]: (state, action) => {
      state.isGetAttendanceLogLoading = true;
    },
    [getAttendanceLog.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isGetAttendanceLogLoading: false,
        attendanceLog: action.payload?.result,
      });
    },
    [getAttendanceLog.rejected]: (state, action) => {
      state.isLoginLoading = false;
      state = Object.assign(state, INITIAL_STATE);
    },

    //@Filter attendance
    [filterAttendance.pending]: (state, action) => {
      state.isFilterAttendanceLoading = true;
    },
    [filterAttendance.fulfilled]: (state, action) => {
      state = Object.assign(state, {
        isFilterAttendanceLoading: false,
        attendanceLog: action.payload?.result,
      });
    },
    [filterAttendance.rejected]: (state, action) => {
      state.isLoginLoading = false;
      state = Object.assign(state, INITIAL_STATE);
    },
  },
});

export default attendance.reducer;
