import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name or email or password is required");
    }
    try {
      const url = "https://jwt-mern-swamfires-projects.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      console.log(result);
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
        // handleError(message);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  //   console.log(signupInfo);
  return (
    <div className="container">
      <h1>SignUp</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter Your name"
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Your email"
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Your password"
            value={signupInfo.password}
          />
        </div>
        <button>Signup</button>
        <span>
          Already Have an Account ?<Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
