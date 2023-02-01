import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import ForgetPassword from "./forgetPassword.js";
import AuthContext from "../store/auth-context";
import Signup from "./Signup";
import { toast } from "react-toastify";
import {LoginURL} from '../config/url-constant'

// Creating schema
const validate = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string().required("Password is a required field"),
});

function Login() {
  const [error, setError] = useState("null");
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const onSubmit = async (values, actions) => {
    console.log(values);
    const res = fetch(LoginURL, {
    
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            toast.error("user not found");
          }
          if (response.status === 401) {
            toast.error("Wrong Credientials");
          }
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        localStorage.setItem("token", responseJson.token);
        localStorage.setItem("user", JSON.stringify(responseJson.user));

        const token = localStorage.getItem("token");

        authCtx.login(token);
        history.replace("/category");
        toast.success("Successfully Login");
      })
      .catch((error) => {
        setError(error);
        console.error(error);
      });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  return (
    <Formik
      validationSchema={validate}
      initialValues={{ email: "", password: "" }}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <div class="hold-transition login-page">
          <div class="login-box">
            <div class="card card-outline card-primary">
              <div class="card-header text-center">
                <h1 class="h1">
                  <b>Login</b>
                </h1>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Log in to start your session</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                      class="form-control"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter email"
                      id="email"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  {errors.email && touched.email && errors.email}
                  <div className="input-group mb-3">
                    <input
                      class="form-control"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      //   className="form-control"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  {errors.password && touched.password && errors.password}
                  <div className="row">
                    <div className="col-8">
                      <div className="icheck-primary">
                        {/* <Checkbox name="remember" type="checkbox" /> */}
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember Me</label>
                      </div>
                    </div>
                    {/* /.col */}
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={!validate}
                      >
                        Login
                      </button>
                    </div>
                    {/* /.col */}
                  </div>
                </Form>
                <p className="mb-1">
                  <Link to="/forgetpassword" element={<ForgetPassword />}>
                    Forget Password
                  </Link>
                </p>
                <p className="mb-0">
                  <Link to="/" element={<Signup />}>
                    Register a new membership
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
