import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
// import TextField from "./helper/customTextfield";
// import Login from "./login";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {ResetpasswordURL} from "../config/url-constant"

const ResetPassword = () => {
  const params = useParams();

  const [error, setError] = useState("null");
  const history = useHistory();
  const onSubmit = async (values, actions) => {
    console.log(values);

    console.log(params.token);
    const res = fetch(
      ResetpasswordURL+`${params.token}`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    )
      .then((response) => {
        response.json();
        if (response.status === 201) {
          toast.success(
            "Reset Password Successfully. Now Login with new Password"
          );
          history.replace("/login");
        }
       
      })
      .catch((err) => {
        setError(err);
        console.error("error", error);
      });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const validate = Yup.object().shape({
    password: Yup.string()
      // .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
      // .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
      // .matches(/\d/, "Password must have a number")
      // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      // .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm password is required"),
  });
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <>
          <div class="hold-transition login-page">
            <div class="login-box">
              <div class="card card-outline card-primary">
                <div class="card-header text-center">
                  <a href="../../index2.html" class="h1">
                    Reset Password
                  </a>
                </div>
                <div class="card-body">
                  <p class="login-box-msg">
                    You are only one step a way from your new password, recover
                    your password now.
                  </p>
                  <Form>
                    <div className="input-group mb-3">
                      <input
                        class="form-control"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Enter password"
                        id="password"
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock" />
                        </div>
                      </div>
                    </div>
                    {errors.password && touched.password && errors.password}

                    <div className="input-group mb-3">
                      <input
                        class="form-control"
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        placeholder="Retype password"
                        id="confirmPassword"
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock" />
                        </div>
                      </div>
                    </div>
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                    <div class="row">
                      <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block">
                          Change password
                        </button>
                      </div>
                    </div>
                  </Form>

                  {/* <p class="mt-3 mb-1">
        <a href="login.html">Login</a>
      </p> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default ResetPassword;
