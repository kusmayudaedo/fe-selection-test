import "./index.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Attendance from "./Attendance";
import User from "./User";
import Expense from "./Expense";

function Admin() {
  const { context } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const allowedContext = ["attendance", "user", "expense"].find(
      (item) => item === context
    );
  }, [context]);

  return (
    <div className='admin'>
      <div className='side-bar'>
        <div className='sidebar-item'>
          <ul className='sidebar-list'>
            <li
              className={context === "attendance" ? "active" : ""}
              onClick={() => navigate("/admin/attendance")}
            >
              Attendance
            </li>
            <li
              className={context === "user" ? "active" : ""}
              onClick={() => navigate("/admin/user")}
            >
              User
            </li>
            <li
              className={context === "expense" ? "active" : ""}
              onClick={() => navigate("/admin/expense")}
            >
              Expense
            </li>
          </ul>
        </div>
      </div>
      <div className='admin-page'>
        {context === "attendance" && <Attendance />}
        {context === "user" && <User />}
        {context === "expense" && <Expense />}
      </div>
    </div>
  );
}

export default Admin;
