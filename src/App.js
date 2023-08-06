import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { keepLogin } from "./store/slices/auth/slices";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import Employee from "./pages/employee/Employee";
import Navbar from "./components/navbar/Navbar";
import AccountSettings from "./pages/accountSetting/AccountSettings";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ChangePassword from "./pages/changePassword/ChangePassword";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return {
      user: state.auth,
    };
  });

  useEffect(() => {
    dispatch(keepLogin());
  }, []);

  const token = localStorage.getItem("token");
  return (
    <Router>
      <div className='App'>
        {token && <Navbar user={user} />}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/admin/:context' element={<Admin />} />
          <Route path='/employee/:context' element={<Employee />} />
          <Route path='/account-settings' element={<AccountSettings />} />
          <Route
            path='/auth/reset-password/:token'
            element={<ResetPassword />}
          />
          <Route
            path='auth/change-password/:token'
            element={<ChangePassword />}
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
