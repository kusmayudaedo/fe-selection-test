import "./index.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClockIn from "./ClockIn";
import Attendance from "./Attendance";
import Earning from "./Earning";

function Employee() {
  const { context } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const allowedContext = ["clock-in", "attendance", "earnings"].find(
      (item) => item === context
    );
  }, [context]);

  return (
    <div className='employee'>
      <div className='side-bar'>
        <div className='sidebar-item'>
          <ul className='sidebar-list'>
            <li
              className={context === "clock-in" ? "active" : ""}
              onClick={() => navigate("/employee/clock-in")}
            >
              Clock In
            </li>
            <li
              className={context === "attendance" ? "active" : ""}
              onClick={() => navigate("/employee/attendance")}
            >
              Attendance
            </li>
            <li
              className={context === "earnings" ? "active" : ""}
              onClick={() => navigate("/employee/earnings")}
            >
              My Earning
            </li>
          </ul>
        </div>
      </div>
      <div className='employee-page'>
        {context === "clock-in" && <ClockIn />}
        {context === "attendance" && <Attendance />}
        {context === "earnings" && <Earning />}
      </div>
    </div>
  );
}

export default Employee;
