import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {CategoriesURL, PhotoURL} from "../../../config/url-constant";
var token = localStorage.getItem("token");
const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
// Creating schema
const validate = Yup.object().shape({
  categoryName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Category name is required"),

  photo: Yup.mixed()
    .nullable()
    .test("size", "Filesize is too big", (file) => {
      if (file) {
        return file.size <= 5 * 1024 * 1024;
      } else {
        return true;
      }
    })
    .test(
      "type",
      "Invalid file format selection",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
});

function EditUser() {
  const [category, setCategory] = useState([]);
  const [file, setFile] = useState("");
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    const fetchcategories = async () => {
      const response = await fetch(CategoriesURL + `/${params.categoryId}`);
      const responseData = await response.json();

      setCategory(responseData);
      console.log(responseData);
    };
    fetchcategories();
  }, []);

  const onSubmit = async (values, actions) => {
    console.log(values);
    const data = new FormData();
    console.log(file);
    data.append("categoryName", values.categoryName);
    data.append("photo", file);
    let res = await fetch(CategoriesURL + `/${params.categoryId}`, {
      method: "put",
      body: data,
    })
      .then((response) => {
        response.json();
        toast.success("Category updated successfully");
        history.push("/category");
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
        categoryName: category?.category?.categoryName,

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
                  <b>Category</b>
                </h1>
              </div>

              <div className="card-body">
                <p className="login-box-msg">Update the Category</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                      className={
                        "form-control" +
                        (errors.categoryName && touched.categoryName
                          ? " is-invalid"
                          : "")
                      }
                      type="text"
                      name="categoryName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.categoryName}
                      placeholder="Enter categoryName"
                      id="categoryName"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  {errors.categoryName && touched.categoryName && (
                    <div className="error">{errors.categoryName}</div>
                  )}
                  <div></div>
                  <img
                    class="image"
                    src={
                      values.photo
                        ? URL.createObjectURL(values.photo)
                        : PhotoURL +
                          category?.category?.photo
                    }
                    alt="category Image"
                  />

                  <div className="input-group mb-3">
                    <input
                      className={
                        "form-control" +
                        (errors.photo && touched.photo ? " is-invalid" : "")
                      }
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
                  {errors.photo && touched.photo && (
                    <div className="error">{errors.photo}</div>
                  )}
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
