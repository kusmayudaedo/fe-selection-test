import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import attendanceReducer from "./slices/attendance";
import employeeReducer from "./slices/employee";
import balanceReducer from "./slices/balance";

const store = configureStore({
  reducer: {
    auth: authReducer,
    attendance: attendanceReducer,
    employeeManagement: employeeReducer,
    balance: balanceReducer,
  },
});

export default store;
