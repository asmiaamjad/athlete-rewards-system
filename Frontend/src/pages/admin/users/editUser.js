import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
var token = localStorage.getItem("token");
const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
// Creating schema
const validate = Yup.object().shape({
  username: Yup.string()
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
  
});

function EditUser() {
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState("");
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    const fetchusers = async () => {
      const response = await fetch(
        `http://localhost:8080/users/${params.userId}`
      );
      const responseData = await response.json();
      console.log(responseData);
      setUsers(responseData);
    };
    fetchusers();
  }, []);

  const onSubmit = async (values, actions) => {
    console.log(values);
    const data = new FormData();
    data.append("username", values.username);
    data.append("age", values.age);
    data.append("role", values.role);
    data.append("email", values.email);
    data.append("photo", file);
    for (const value of data.values()) {
      console.log("form values", value);
    }

    let res = await fetch(`http://localhost:8080/users/${params.userId}`, {
      method: "put",
      body: data,
    })
      .then((response) => {
        response.json();
        if (response.status === 201) {
          toast.success("User Updated Successfully");
          history.push("/users");
        } else {
          toast.error("User doesn't update");
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
      enableReinitialize={true}
      initialValues={{
        username: users.username,
        age: users.age,
        role: users.role,
        email: users.email,
        photo: null,
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
                <p className="login-box-msg">Update user</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                       className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}
                      type="text"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="Enter userName"
                      id="username"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div></div>
                    {errors.username && touched.username && (<div class ="error">{errors.username}</div>)}
                 
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
                    </div></div>
                    {errors.age && touched.age && (<div class ="error">{errors.age}</div>)}
                  
                  <div className="input-group mb-3">
                    <input
                      name="role"
                      className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.role}
                      placeholder="Role"
                      id="role"
                    ></input>
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
                    </div> </div>
                    {errors.email && touched.email && (<div class ="error">{errors.email}</div>)}
                 

                  <img
                    class="image"
                    src={
                      values.photo
                        ? URL.createObjectURL(values.photo)
                        : "http://localhost:8080/images/photos/" + users.photo
                    }
                    alt="User Image"
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
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={!validate}
                      >
                        Update
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

export default EditUser;
