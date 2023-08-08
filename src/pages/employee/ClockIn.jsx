import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clockIn,
  clockOut,
  filterAttendance,
} from "../../store/slices/attendance/slices";
import moment from "moment";

function ClockIn() {
  const dispatch = useDispatch();
  const clockFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";
  const dateFormat = "YYYY-MM-DD";
  const [currentTime, setCurrentTime] = useState();

  const { attendanceLog } = useSelector((state) => {
    return {
      attendanceLog: state.attendance.attendanceLog,
    };
  }, []);

  useEffect(() => {
    dispatch(
      filterAttendance({
        startDate: moment().format(dateFormat),
        endDate: moment().format(dateFormat),
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      let time = new Date().toLocaleTimeString();
      setCurrentTime(time);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClockIn = () => {
    dispatch(
      clockIn({
        date: moment().format(dateFormat),
        clockIn: moment().format(clockFormat),
      })
    );
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleClockOut = () => {
    dispatch(
      clockOut({
        date: moment().format(dateFormat),
        clockOut: moment().format(clockFormat),
      })
    );
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className='clock-container'>
      <div className='clock'>
        <h1>{currentTime}</h1>
      </div>
      <div className='clock-button'>
        <button onClick={handleClockIn}>Clock In</button>
        <button onClick={handleClockOut}>Clock Out</button>
      </div>
      <div className='clock-log'>
        <table className='clock-table'>
          <thead>
            <tr>
              <th>Clock In</th>
              <th>Clock Out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {attendanceLog[0]?.clockIn
                  ? moment.utc(attendanceLog[0].clockIn).format("HH:mm:ss")
                  : "-"}
              </td>
              <td>
                {attendanceLog[0]?.clockOut
                  ? moment.utc(attendanceLog[0].clockOut).format("HH:mm:ss")
                  : "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClockIn;
