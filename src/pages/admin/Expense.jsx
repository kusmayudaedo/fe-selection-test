import "./index.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBalance } from "../../store/slices/balance/slices";
import moment from "moment";

function Expense() {
  const dispatch = useDispatch();
  const formatDate = "YYYY-MM-DD";
  const formatClock = "HH:mm:ss";
  const { isGetBalanceLoading, balance, totalSalary } = useSelector((state) => {
    return {
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
    dispatch(getBalance({ id: "", sort: "ASC" }));
  }, []);

  return (
    <div className='balance'>
      <div className='expense-summary'>
        <div className='total-expense'>
          <div className='total-expense-box'>
            <h3>Total Expense</h3>
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

export default Expense;
