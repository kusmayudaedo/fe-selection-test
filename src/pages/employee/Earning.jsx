import "./index.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBalance } from "../../store/slices/balance/slices";
import moment from "moment";

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
  const formatCurrency = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };
  useEffect(() => {
    dispatch(getBalance({ id: id, sort: "ASC" }));
  }, [id, salary]);

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
        <h2>Expense List</h2>
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
