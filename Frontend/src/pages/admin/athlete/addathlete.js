import React, { useContext, useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "../main.css";
import { DrillsURL, CategoriesURL, AthletesURL} from "../../../config/url-constant"

const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];

// Creating schema
const validate = Yup.object().shape({
  athleteName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Athlete name is required"),
  dateofBirth: Yup.date().required("Athlete date of birth is required"),
  category_id: Yup.string().required("Category is required"),
  drill_id: Yup.array().required("Drill is a required field"),

  photo: Yup.mixed()
    .nullable()
    .required("A file is required")
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

function Login() {
  const [file, setFile] = useState("");
  const [categories, setCategory] = useState("");
  const [drill, setDrill] = useState([]);
  const [selected, setSelected] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getdrill = async () => {
      let res = await fetch(DrillsURL);
      // let res = await fetch("http://localhost:8080/drill");
      let responseJson = await res.json();
      const Drill = [];
      for (let i = 0; i < responseJson.length; i++) {
        Drill.push({
          label: responseJson[i].drillName,
          key: responseJson[i]._id,
          value: responseJson[i]._id,
        });
      }
      setDrill(Drill);
    };
    const getcategory = async () => {
      let res = await fetch(CategoriesURL);
      // let res = await fetch("http://localhost:8080/category");
      let responseJson = await res.json();

      setCategory(responseJson);
    };

    getdrill();
    getcategory();
  }, []);

  const onSubmit = async (values, actions) => {
    const select = [];
    for (let i = 0; i < selected.length; i++) {
      console.log(selected[i]);
      select.push(selected[i].value);
    }
    console.log(values);
    const data = new FormData();

    console.log("message", select);

    data.append("athleteName", values.athleteName);
    data.append("dateofBirth", values.dateofBirth);
    data.append("category_id", values.category_id);
    select.forEach((tag) => data.append("drill_id", tag));
    data.append("photo", file);
    let res = await fetch(AthletesURL, {
    
      method: "post",
      body: data,
    })
      .then((response) => {
        response.json();
        if (response.ok) {
          toast.success("Athlete added successfully");

          history.push("/athletes");
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
        athleteName: "",
        dateofBirth: "",
        category_id: "",
        drill_id: [],
        photo: null,
      }}
      // onSubmit={(values) => {
      //   console.log(values);
      // }}
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
                  <b>Athlete</b>
                </h1>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Add an Athlete</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                    className={'form-control' + (errors.athleteName && touched.athleteName ? ' is-invalid' : '')}
                      // class="form-control"
                      type="text"
                      name="athleteName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.athleteName}
                      placeholder="Enter Athlete Name"
                      id="athleteName"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                   
                  </div>
                  {(errors.athleteName &&
                      touched.athleteName) &&
                      (<div className ="error">{errors.athleteName}</div>)}
                  <div className="input-group mb-3">
                    <input
                      className={'form-control' + (errors.dateofBirth && touched.dateofBirth ? ' is-invalid' : '')}
                      type="date"
                      name="dateofBirth"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dateofBirth}
                      placeholder="Enter Date of Birth"
                      id="dateofBirth"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="far fa-calendar-alt" />
                      </div>
                    </div>
                    
                  </div>
                  {errors.dateofBirth &&
                      touched.dateofBirth &&
                      (<div className ="error">{errors.dateofBirth}</div>)}
                  <div className="input-group mb-3">
                    <select
                      className={'form-control' + (errors.category_id && touched.category_id ? ' is-invalid' : '')}
                      value={values.category_id}
                      id="category_id"
                      name="category_id"
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      {categories.length > 0 &&
                        categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.categoryName}
                          </option>
                        ))}
                    </select>
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-square" />
                      </div>
                    </div>
                  </div>
                  {errors.category_id && touched.category_id && (<div className ="error">{errors.category_id}</div>)}

                  <div className="input-group mb-3">
                    <MultiSelect
                      style={{ width: "500px " }}
                      className={'rmsc' + (errors.drill_id && touched.drill_id ? ' is-invalid' : '')}
                      displayValue="label"
                      value={selected}
                      id="drill_id"
                      name="drill_id"
                      onChange={setSelected}
                      isCreatable={true}
                      placeholder="Select drills"
                      options={drill}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-square" />
                      </div>
                    </div>
                   
                  </div>
                  {errors.drill_id && touched.drill_id && (<div className ="error">{errors.drill_id}</div>)}
                  <img
                    class="image"
                    
                    src={
                      values.photo
                        ? URL.createObjectURL(values.photo)
                        : "No file choosen"
                    }
                    alt="Select an image"
                  />
                  <span></span>

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
                        <span className="fas fa-user" />
                      </div>
                    </div>
                   
                  </div>
                  {errors.photo && touched.photo && (<div className ="error">{errors.photo}</div>)}
                  <div className="row">
                    <div className="col-8"></div>

                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={!validate}
                      >
                        Add
                      </button>
                    </div>
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
