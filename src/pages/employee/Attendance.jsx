import "./index.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAttendanceLog,
  filterAttendance,
} from "../../store/slices/attendance/slices";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import Toast from "react-hot-toast";

function Attendance() {
  const dispatch = useDispatch();
  const formatDate = "YYYY-MM-DD";
  const formatClock = "HH:mm:ss";
  const { attendanceLog } = useSelector((state) => {
    return {
      attendanceLog: state.attendance.attendanceLog,
    };
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(getAttendanceLog());
  }, []);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      Toast.error(
        !startDate ? "Start Date cannot be empty" : "End Date cannot be empty"
      );
    } else {
      dispatch(
        filterAttendance({
          startDate: moment(startDate).format(formatDate),
          endDate: moment(endDate).format(formatDate),
        })
      );
    }
  };

  const handleRisetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    dispatch(getAttendanceLog());
  };

  return (
    <div className='attendance'>
      <div className='attendance-content'>
        <div className='attendance-content-top'>
          <h2>Attendance Log</h2>
          <div className='attendance-date-picker-wrapper'>
            <div className='attendance-date-picker'>
              <DatePicker
                placeholderText='Start date'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat='yyyy-MM-dd'
              />
            </div>
            <div className='attendance-date-picker'>
              <DatePicker
                placeholderText='End date'
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat='yyyy-MM-dd'
              />
            </div>
            <span>
              <i
                className='bx bx-filter-alt filter-button'
                onClick={handleFilter}
              ></i>
            </span>
            <span>
              <i
                className='bx bx-refresh filter-button button-delete'
                onClick={handleRisetFilter}
              ></i>
            </span>
          </div>
        </div>
        <table className='attendance-table'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Username</th>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
            </tr>
          </thead>
          <tbody>
            {attendanceLog.length === 0 ? (
              <tr>
                <td>No data to display</td>
              </tr>
            ) : (
              attendanceLog.map((item, index) => (
                <tr key={index}>
                  <td>{item.user.fullName}</td>
                  <td>{item.user.username}</td>
                  <td>{moment(item.date).format(formatDate)}</td>
                  <td>
                    {item.clockIn
                      ? moment.utc(item.clockIn).format(formatClock)
                      : "-"}
                  </td>
                  <td>
                    {item.clockOut
                      ? moment.utc(item.clockOut).format(formatClock)
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
