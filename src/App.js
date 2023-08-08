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
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ChangePassword from "./pages/changePassword/ChangePassword";
import NotFound from "./pages/notFound";
import ProtectedRoute from "./protected.routes.js";

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
          <Route
            path='/auth/reset-password/:token'
            element={<ResetPassword />}
          />
          <Route
            path='auth/change-password/:token'
            element={<ChangePassword />}
          />

          {user.role === 1 && (
            <>
              <Route
                path='/admin/:context'
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          {user.role === 2 && (
            <>
              <Route
                path='/employee/:context'
                element={
                  <ProtectedRoute>
                    <Employee />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          <Route path='*' element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
