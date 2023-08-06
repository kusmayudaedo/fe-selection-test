import "./resetPassword.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword, verifyAccount } from "../../store/slices/auth/slices";
import { resetPasswordSchema } from "../../store/slices/auth/validation";
import { useEffect, useState } from "react";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [verifyAccountToken, setVerifyAccountToken] = useState();

  useEffect(() => {
    setVerifyAccountToken(location.pathname.split("/")[3]);
  }, [location.pathname]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    // Validate the input using resetPasswordSchema
    resetPasswordSchema
      .validate(values, { abortEarly: false })
      .then((validatedValues) => {
        // If validation succeeds, dispatch the login action
        localStorage.setItem("token", verifyAccountToken);
        dispatch(verifyAccount());
        dispatch(resetPassword(validatedValues))
          .then(() => {
            localStorage.removeItem("token");
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 500);
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
    <div className='reset'>
      <div className='reset-container'>
        <h2>Reset Password</h2>
        <form className='reset-form' onSubmit={handleSubmit}>
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
          <button
            className='reset-button'
            type='submit'
            // disabled={isLoginLoading}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
