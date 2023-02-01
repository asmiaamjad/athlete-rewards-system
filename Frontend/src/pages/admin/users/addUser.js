import React, { useContext, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "../main.css";
import {UsersURL} from "../../../config/url-constant";
const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
// Creating schema
const validate = Yup.object().shape({
  userName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("User name is required"),
  age: Yup.number()
    .positive()
    .integer()
    .min(15, "You need to be older than 15 to register")
    .required("User age is required"),
  role: Yup.string().required("User role is required"),
 
  email: Yup.string()
    .required("Email is a required")
    .email("Invalid email format"),
  password: Yup.string().required("Password is a required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
  photo: Yup.mixed()
    .nullable()
    .required("User photo is required")
    .test(
      "size",
      "Filesize is too big",
      (value) => value && value.size <= 5 * 1024 * 1024 // 5MB
    )
    .test(
      "type",
      "Invalid file format selection",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
  acceptedTos: Yup.boolean().oneOf([true], "Please Accept terms of service"),
});

function Login() {
  const [file, setFile] = useState("");
  const history = useHistory();

  const onSubmit = async (values, actions) => {
    console.log(values);
    const data = new FormData();
    console.log(file);
    data.append("username", values.userName);
    data.append("age", values.age);
    data.append("role", values.role);
    data.append("email", values.email);
    data.append("password", values.password);
    data.append("confirmPassword", values.confirmPassword);
    data.append("photo", file);
    let res = await fetch(UsersURL, {
      method: "post",
      body: data,
    })
      .then((response) => {
        response.json();
        if(response.status===404){
          toast.error("Email already exist. Try again");
        }
        else if(response.status != 500) {
          toast.success("User added successfully");

          history.push("/users");
        } else {
          toast.error("Something invalid happened");
        }
      })

      .catch((error) => {
        console.error(error);
      });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  return (
    <Formik
      validationSchema={validate}
      initialValues={{
        userName: "",
        age: "",
        role: "",
        email: "",
        password: "",
        confirmPassword: "",
        photo: null,
        acceptedTos: true,
      }}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <div class="hold-transition register-page">
          <div class="register-box">
            <div class="card card-outline card-primary">
              <div class="card-header text-center">
                <h1 class="h1">
                  <b>User</b>
                </h1>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Add a user</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                      className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')}
                      type="text"
                      name="userName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.userName}
                      placeholder="Enter userName"
                      id="userName"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  {errors.userName && touched.userName && (<div class ="error">{errors.userName}</div>)}
                  <div className="input-group mb-3">
                    <input
                      className={'form-control' + (errors.age && touched.age ? ' is-invalid' : '')}
                      type="number"
                      name="age"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.age}
                      placeholder="Enter age"
                      id="age"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  {errors.age && touched.age && <div class="error">{errors.age}</div>}
                  <div className="input-group mb-3">
                    <select
                      name="role"
                      className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.role}
                      placeholder="Role"
                      id="role"
                    >
                      <option value="">Select your Role</option>
                      <option value="user">User</option>
                      <option value="athlete">Athlete</option>
                    </select>

                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                  {errors.role && touched.role && (<div class ="error">{errors.role}</div>)}
                  <div className="input-group mb-3">
                    <input
                      className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
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
                  {errors.email && touched.email && (<div class ="error">{errors.email}</div>)}
                  <div className="input-group mb-3">
                    <input
                      className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
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
                  {errors.password && touched.password && (<div class ="error">{errors.password}</div>)}
                  <div className="input-group mb-3">
                    <input
                      className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}
                      name="confirmPassword"
                      type="password"
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
                    (<div class ="error">{errors.confirmPassword}</div>)}
                     <img
                    class="image"
                    src={
                      values.photo
                        ? URL.createObjectURL(values.photo)
                        : "No file choosen"
                    }
                    alt="Select an image"
                  />
                  <div className="input-group mb-3">
                    <input
                     className={'form-control' + (errors.photo && touched.photo ? ' is-invalid' : '')}
                      id="photo"
                      name="photo"
                      type="file"
                      onChange={(event) => {
                        setFieldValue("photo", event.currentTarget.files[0]);
                        setFile(event.currentTarget.files[0]);
                      }}
                     
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  {errors.photo && touched.photo && (<div class ="error">{errors.photo}</div>)}
                  <div className="row">
                    <div className="col-8"></div>
                    {/* /.col */}
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={!validate}
                      >
                        Add User
                      </button>
                    </div>
                    {/* /.col */}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
