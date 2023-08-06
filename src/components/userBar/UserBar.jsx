import "./userBar.css";

import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/auth/slices";
import { useDispatch } from "react-redux";

function UserBar({ handleUserBarItemClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className='userbar'>
      <div className='userbar-container'>
        <ul className='userbar-list'>
          <li
            className='userbar-list-item'
            onClick={() => {
              handleLogoutClick();
              handleUserBarItemClick();
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserBar;
