import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const { user, handleLogIn } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  }); 

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });

    // console.log(credentials);
  };
  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={(e) => handleLogIn(e, credentials)}>
          <div className="field--wrapper">
            <label>Email: </label>
            <input
              name="email"
              type="text"
              required
              placeholder="Enter your email"
              onChange={(e) => handleInput(e)}
              value={credentials.email}
            />
          </div>
          <div className="field--wrapper">
            <label>Password:</label>
            <input
              type="password"
              required
              placeholder="Enter passwpord"
              name="password"
              onChange={(e) => handleInput(e)}
              value={credentials.password}
            />
          </div>
          <div className="field--wrapper">
            <button type="submit" className="btn btn--lg btn--main">
              Login
            </button>
          </div>
        </form>
        <p>Dont have an account? Register <Link to="/register">here</Link></p>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  );
};

export default LoginPage;
