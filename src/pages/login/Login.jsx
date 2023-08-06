import "./login.css";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, forgetPassword } from "../../store/slices/auth/slices";
import { loginValidationSchema } from "../../store/slices/auth/validation";

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
    width: "500px",
    height: "max-content",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    backgroundColor: "#fff",
    border: "none",
  },
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { role, isLoginLoading } = useSelector((state) => {
    return {
      isLoginLoading: state.auth.isLoginLoading,
      role: state.auth.role,
    };
  });

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [email, setEmail] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const handleChangeEmail = (e) => {
    setEmail({ email: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});

    // Validate the input using loginValidationSchema
    loginValidationSchema
      .validate(values, { abortEarly: false })
      .then((validatedValues) => {
        // If validation succeeds, dispatch the login action
        dispatch(login(validatedValues))
          .then(() => {
            // Handle successful login, e.g., redirect to home page
          })
          .catch((error) => {
            // Handle login errors, e.g., show error message
            setErrors({ message: error.message }); // Set general error message
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

  useEffect(() => {
    if (role === 1) {
      navigate("/admin/attendance");
    }

    if (role === 2) {
      navigate("/employee/clock-in");
    }
  }, [role, navigate]);

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleForgetPassword = () => {
    dispatch(forgetPassword(email));
    setIsModalOpen(false);
    setEmail("");
  };

  return (
    <>
      <div className='login'>
        <div className='login-container'>
          <h2>Login</h2>
          <form className='login-form' onSubmit={handleSubmit}>
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
            {errors.username && <span>{errors.username}</span>}
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
            <button
              className='login-button'
              type='submit'
              disabled={isLoginLoading}
            >
              Login
            </button>
            <span className='link forget-password' onClick={openModal}>
              Forget password?
            </span>
          </form>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <h2>Please enter your email</h2>
        <input
          type='text'
          id='email'
          name='email'
          value={email.email}
          onChange={handleChangeEmail}
        />
        <button
          className='login-button'
          onClick={handleForgetPassword}
          disabled={isLoginLoading}
        >
          Submit
        </button>
      </Modal>
    </>
  );
}

export default Login;
