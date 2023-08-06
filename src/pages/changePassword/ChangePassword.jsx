import "./changePassword.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { changePassword, verifyAccount } from "../../store/slices/auth/slices";
import { changePasswordSchema } from "../../store/slices/auth/validation";

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const [verifyAccountToken, setVerifyAccountToken] = useState();

  useEffect(() => {
    setVerifyAccountToken(location.pathname.split("/")[3]);
  }, [location.pathname]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    // Validate the input using changePasswordSchema
    changePasswordSchema
      .validate(values, { abortEarly: false })
      .then((validatedValues) => {
        // If validation succeeds, dispatch the login action
        localStorage.setItem("token", verifyAccountToken);
        dispatch(verifyAccount());
        dispatch(changePassword(validatedValues))
          .then(() => {
            localStorage.removeItem("token");
            if (!localStorage.getItem("token")) {
              navigate("/");
            }
          })
          .catch((error) => {
            setErrors({ message: error.message });
          })
          .finally(() => {});
      })
      .catch((validationErrors) => {
        // If validation fails, set the error messages in the state separately
        const errorMessages = validationErrors.inner.reduce(
          (acc, currentError) => {
            acc[currentError.path] = currentError.message;
            return acc;
          },
          {}
        );
        setErrors(errorMessages);
      });
  };

  return (
    <div className='change-password'>
      <div className='change-password-container'>
        <h2>Change Password</h2>
        <form className='change-password-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='currentPassword'>Current Password</label>
            <input
              type='password'
              id='currentPassword'
              name='currentPassword'
              value={values.currentPassword}
              onChange={handleChange}
            />
          </div>
          {errors.currentPassword && <span>{errors.currentPassword}</span>}
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={values.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <span>{errors.password}</span>}
          <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          <button className='change-password-button' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
