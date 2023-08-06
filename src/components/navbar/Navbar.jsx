import "./navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PPImage from "../../asset/no-profile-picture.png";
import Modal from "react-modal";
import UserBar from "../userBar/UserBar";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "flex-end", // Aligns the modal to the right
    alignItems: "flex-start", // Aligns
  },
  content: {
    position: "absolute",
    top: "65px",
    right: "0",
    left: "auto",
    marginRight: "65px",
    width: "250px",
    height: "max-content",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    backgroundColor: "#fff",
    border: "none",
  },
};

function Navbar({ user }) {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUserBarItemClick = () => {
    closeModal();
  };
  return (
    <>
      <div className='top'>
        <div className='top-left'>
          <h3
            className='top-left-title'
            onClick={() => {
              user.id === 1
                ? navigate("/admin/attendance")
                : navigate("/employee/clock-in");
            }}
          >
            Tokopaedi
          </h3>
        </div>
        <div className='top-right'>
          <span className='top-right-username'>{user.username}</span>
          <img
            onClick={openModal}
            className='top-img'
            src={
              user.profileImg
                ? `${
                    process.env.REACT_APP_PRODUCT_IMAGE_URL +
                    "/" +
                    user.profileImg
                  }`
                : PPImage
            }
            alt=''
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <UserBar handleUserBarItemClick={handleUserBarItemClick} />
      </Modal>
    </>
  );
}

export default Navbar;
