import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const RegisterPage = () => {
  const { handleRegister } = useAuth();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
    // console.log("Credentials: ",credentials);
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={(e) => handleRegister(e, credentials)}>
          <ToastContainer position="top-center" theme="dark" />
          <div className="field--wrapper">
            <label>Enter Name : </label>
            <input
              required
              type="text"
              name="name"
              placeholder="Enter your Name: "
              onChange={(e) => handleInput(e)}
              value={credentials.name}
            />
          </div>
          <div className="field--wrapper">
            <label>Enter email : </label>
            <input
              required
              type="text"
              name="email"
              placeholder="Register your email"
              onChange={(e) => handleInput(e)}
              value={credentials.email}
            />
          </div>
          <br />
          <div className="field-wrapper">
            <label>Enter password : </label>
            <input
              required
              type="password"
              name="password1"
              placeholder="create password"
              value={credentials.password1}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <br />
          <div className="field--wrapper">
            <label>Confirm password : </label>
            <input
              required
              type="password"
              name="password2"
              placeholder="confirm password"
              value={credentials.password2}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="field--wrapper">
            <button className="btn btn--lg btn--main" type="submit">
              Create Account
            </button>
          </div>
          <p>
            Already have an account? Login <Link to="/login">here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
