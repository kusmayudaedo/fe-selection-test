import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttendanceLog } from "../../store/slices/attendance/slices";
import moment from "moment";
import "./index.css";

function Attendance() {
  const dispatch = useDispatch();
  const formatDate = "YYYY-MM-DD";
  const formatClock = "HH:mm:ss";
  const { isGetAttendanceLoading, attendanceLog } = useSelector((state) => {
    return {
      isGetAttendanceLoading: state.attendance.isGetAttendanceLoading,
      attendanceLog: state.attendance.attendanceLog,
    };
  });

  useEffect(() => {
    dispatch(getAttendanceLog());
  }, []);

  return (
    <div className='attendance'>
      <div className='attendance-content'>
        <h2>Attendance Log</h2>
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
