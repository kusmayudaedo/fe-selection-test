import "./registerUser.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerEmployee } from "../../store/slices/employee/slices";

function RegisterUser() {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //handle image
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // Check if a file was selected
    if (selectedImage) {
      const { type, size } = selectedImage;
      const allowedExtensions = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      // Check if the file extension and size are valid
      if (allowedExtensions.includes(type) && size <= maxSize) {
        setImage(selectedImage);
      } else {
        // Invalid file, reset the input and display an error message
        setImage(null);
        e.target.value = null;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = JSON.stringify(values);
    const formData = new FormData();
    formData.append("data", userData);
    formData.append("file", image);
    dispatch(registerEmployee(formData));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <>
      <div className='register'>
        <div className='register-container'>
          <h2>Register</h2>
          <form className='register-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='fullName'>Full Name</label>
              <input
                type='text'
                id='fullName'
                name='fullName'
                value={values.fullName}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                id='username'
                name='username'
                value={values.username}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                id='email'
                name='email'
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Phone</label>
              <input
                type='text'
                id='phone'
                name='phone'
                value={values.phone}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Salary</label>
              <input
                type='text'
                id='salary'
                name='salary'
                value={values.salary}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label className='file-input-label' htmlFor='image'>
                Upload Image
              </label>
              <input
                type='file'
                id='image'
                className='file-input'
                onChange={handleImageChange}
              />
            </div>
            {image && <img className='img-upload' src={image} alt='Selected' />}
            <button className='register-button' type='submit'>
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterUser;
