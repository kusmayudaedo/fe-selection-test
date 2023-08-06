import "./profileCard.css";
import PPImage from "../../asset/no-profile-picture.png";

function ProfileCard({ user }) {
  return (
    <div className='card-container'>
      <div className='card-img'>
        <img
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
      <div className='card-profile'>
        <ul className='card-profile-item'>
          <li className='card-profile-list'>{user.fullName}</li>
          <li className='card-profile-list'>{`@${user.username}`}</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileCard;
