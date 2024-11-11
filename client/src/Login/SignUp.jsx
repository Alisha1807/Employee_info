import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style2 from "./SIgnUp.module.css";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    fn: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value.toLowerCase(),
    }));
  };

  const registerUser = (e) => {
    e.preventDefault();
    const { fn, email, mobile, password } = formValues;

    if (!fn || !email || !mobile || !password) {
      setMessage("All fields are required");
      return;
    }

    let existingUsers = JSON.parse(localStorage.getItem("student")) || [];
    let userExists = existingUsers.find(
      (user) => user.email === email || user.mobile === mobile
    );

    if (userExists) {
      setMessage("User already exists, please login");
      return;
    }

    existingUsers.push({ fn, email, mobile, password });
    localStorage.setItem("student", JSON.stringify(existingUsers));
    setMessage("Registration successful!");
    setRegistrationSuccess(true);
  };

  const loginUser = (e) => {
    e.preventDefault();
    const { email, mobile, password } = formValues;

    if ((!email && !mobile) || !password) {
      setMessage("All fields are required");
      return;
    }

    let existingUsers = JSON.parse(localStorage.getItem("student")) || [];
    let userMatches = existingUsers.find(
      (user) =>
        (user.password === password && user.email === email) ||
        (user.password === password && user.mobile === mobile)
    );

    if (!userMatches) {
      setMessage("Incorrect Email or Password");
      return;
    } else {
      setMessage("Login successful!");
      navigate("/admin");
    }
  };

  const toggleLoginRegister = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setFormValues({
      fn: "",
      email: "",
      mobile: "",
      password: "",
    });
    setRegistrationSuccess(false);
  };

  return (
    <div className={style2.outerBody}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <div className={style2.outerBody}>
        <form
          onSubmit={isLogin ? loginUser : registerUser}
          className={style2.outerContainer}
        >
          {!isLogin && (
            <input
              type="text"
              name="fn"
              placeholder="Name"
              onChange={handleChange}
              value={formValues.fn}
            />
          )}

          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formValues.email}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            value={formValues.mobile}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formValues.password}
          />

          <button type="submit" className={style2.submit}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
      <p>{message}</p>
      {!isLogin && registrationSuccess && (
        <button onClick={toggleLoginRegister}>Switch to Login</button>
      )}
      {isLogin && (
        <button onClick={toggleLoginRegister}>Switch to Register</button>
      )}
    </div>
  );
};

export default SignUp;
