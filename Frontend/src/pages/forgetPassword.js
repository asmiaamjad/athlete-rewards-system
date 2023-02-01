import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {toast} from 'react-toastify';
import {ForgotpasswordURL} from "../config/url-constant";

const ForgetPassword = () => {
  const [error, setError] = useState("null");
  const onSubmit = async (values, actions) => {
    console.log(values);

    const res = fetch(ForgotpasswordURL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {response.json();
        if(response.status===404){
          toast.error("user not found");
        }
      else if(response.status===200){
        toast.success("Email sent sucessfully.Kindly follow the instructions");
      }
      else{
        toast.error("Email not sent");
      }
      })
      .catch((error) => {
        setError(error);
        // toast.error(`${error}`)
        console.error(error);
      });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const validate = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        // password: "",
      }}
      validationSchema={validate}
      onSubmit={onSubmit}
    >
       {({ values, errors, touched, handleChange, handleBlur }) => (
        <div>
          <div class="hold-transition login-page">
          <div class="login-box">
            <div class="card card-outline card-primary">
              <div class="card-header text-center">
                <a href="../../index2.html" class="h1">
                  <b>ForgetPassword</b>
                </a>
              </div>
              <div class="card-body">
                <p class="login-box-msg">
                  You forgot your password? Here you can easily retrieve a new
                  password.
                </p>
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
                  <div class="row">
                    <div class="col-12">
                      <button type="submit" class="btn btn-primary btn-block">
                        Request new password
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
        </div>
      )}
    </Formik>
  );
};

export default ForgetPassword;
