import "./index.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployeeInfo } from "../../store/slices/employee/slices";
import PPImage from "../../asset/no-profile-picture.png";
import Modal from "react-modal";
import RegisterUser from "../../components/modal/registerUser";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "max-content",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    backgroundColor: "#fff",
    border: "none",
  },
};

function User() {
  const dispatch = useDispatch();

  const { currentPage, allEmployee } = useSelector((state) => {
    return {
      currentPage: state.employeeManagement.currentPage,
      allEmployee: state.employeeManagement.allEmployee,
    };
  });
  const [asc, setAsc] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusLabels = {
    0: "Unverified",
    1: "Active",
    2: "Inactive",
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  useEffect(() => {
    dispatch(
      getEmployeeInfo({
        status: selectedStatus,
        sort: asc ? "ASC" : "DESC",
        page: currentPage,
      })
    );
  }, [currentPage]);

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='user'>
        <div className='user-content'>
          <h2>
            Employee List{" "}
            <span className='add-icons' onClick={openModal}>
              <i className='bx bx-message-square-add'></i>
            </span>
          </h2>

          <table className='user-table'>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Salary</th>
                <th>Profile Image</th>
              </tr>
            </thead>
            <tbody>
              {allEmployee.length === 0 ? (
                <tr>
                  <td>No data to display</td>
                </tr>
              ) : (
                allEmployee.map((item, index) => (
                  <tr key={index}>
                    <td>{item.fullName}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{statusLabels[item.status]}</td>
                    <td>{formatCurrency(item.salary)}</td>
                    <td>
                      <img
                        className='user-img'
                        src={
                          item.profileImg
                            ? `${
                                process.env.REACT_APP_PRODUCT_IMAGE_URL +
                                "/" +
                                item.profileImg
                              }`
                            : PPImage
                        }
                        alt=''
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <RegisterUser />
      </Modal>
    </>
  );
}

export default User;
