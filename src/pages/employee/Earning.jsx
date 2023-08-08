import "./index.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBalance } from "../../store/slices/balance/slices";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import Toast from "react-hot-toast";

function Earning() {
  const dispatch = useDispatch();
  const formatDate = "YYYY-MM-DD";
  const formatClock = "HH:mm:ss";
  const { id, balance, salary, totalSalary } = useSelector((state) => {
    return {
      id: state.auth.id,
      salary: state.auth.salary,
      isGetBalanceLoading: state.balance.isGetBalanceLoading,
      balance: state.balance.balance,
      totalSalary: state.balance.totalSalary,
    };
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatCurrency = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };
  useEffect(() => {
    dispatch(
      getBalance({ startDate: startDate, endDate: endDate, sort: "DESC" })
    );
  }, []);

  const handleFilter = () => {
    if (!startDate || !endDate) {
      Toast.error(
        !startDate ? "Start Date cannot be empty" : "End Date cannot be empty"
      );
    } else {
      dispatch(
        getBalance({
          startDate: moment(startDate).format(formatDate),
          endDate: moment(endDate).format(formatDate),
          sort: "DESC",
        })
      );
    }
  };

  const handleRisetFilter = () => {
    setStartDate("");
    setEndDate("");
    dispatch(getBalance({ startDate: "", endDate: "", sort: "DESC" }));
  };

  return (
    <div className='balance'>
      <div className='earning-summary'>
        <div className='total-earning'>
          <div className='total-earning-box'>
            <h3>Basic Salary</h3>
            <h2>{formatCurrency(salary)}</h2>
          </div>
          <div className='total-earning-box'>
            <h3>Total Earning</h3>
            <h2>{formatCurrency(totalSalary)}</h2>
          </div>
        </div>
      </div>
      <div className='balance-content'>
        <div className='balance-content-top'>
          <h2>Earning List</h2>
          <div className='balance-date-picker-wrapper'>
            <div className='balance-date-picker'>
              <DatePicker
                placeholderText='Start date'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat='yyyy-MM-dd'
              />
            </div>
            <div className='balance-date-picker'>
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
        <table className='balance-table'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Username</th>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Working Hour</th>
              <th>Daily Salary</th>
            </tr>
          </thead>
          <tbody>
            {balance.length === 0 ? (
              <tr>
                <td>No data to display</td>
              </tr>
            ) : (
              balance.map((item, index) => (
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
                  <td>{item.workingHours}</td>
                  <td>{formatCurrency(item.dailySalary)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Earning;
