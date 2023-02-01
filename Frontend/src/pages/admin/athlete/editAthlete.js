import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { MultiSelect } from "react-multi-select-component";
import moment from "moment";
import * as Yup from "yup";
import { Link, useHistory, useParams } from "react-router-dom";
import "../main.css";
import { toast } from "react-toastify";
import { DrillsURL, CategoriesURL, AthletesURL, PhotoURL } from '../../../config/url-constant';

const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];

// Creating schema
const validate = Yup.object().shape({
  athleteName: Yup.string().required().min(3, "Too Short!").max(50, "Too Long!"),
  dateofBirth: Yup.date().required("Required"),
  category_id: Yup.string().required("Required"),
  // drill_id: Yup.string().required("Drill is a required field"),
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

function EditAthlete() {
  const [file, setFile] = useState("");
  const [athlete, setAthletes] = useState("");
  const [categories, setCategory] = useState("");
  const [drill, setDrill] = useState("");
  const [selected, setSelected] = useState([]);
  const [items, setItems] = useState([]);
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    const fetchathlete = async () => {
      const response = await fetch(AthletesURL+`/${params.athleteId}`
      );
      const responseData = await response.json();
      const Drill = [];
      {
        responseData.drill_id.map((item) => {
          Drill.push({ label: item.drillName, key: item._id, value: item._id });
        });
      }
      console.log(Drill);
      setItems(Drill);

      setAthletes(responseData);
    };
    const getdrill = async () => {
      
      let res = await fetch(DrillsURL);
      let responseJson = await res.json();
      const Drilloptions = [];
      for (let i = 0; i < responseJson.length; i++) {
        Drilloptions.push({
          label: responseJson[i].drillName,
          key: responseJson[i]._id,
          value: responseJson[i]._id,
        });
      }
      setDrill(Drilloptions);

      console.log("options drills", Drilloptions);
    };
    const getcategory = async () => {
      
      let res = await fetch(CategoriesURL);
      let responseJson = await res.json();

      setCategory(responseJson);
    };
    fetchathlete();
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
    console.log(file);
    data.append("athleteName", values.athleteName);
    data.append("dateofBirth", values.dateofBirth);
    data.append("category_id", values.category_id);
    select.forEach((tag) => data.append("drill_id", tag));
    data.append("photo", file);
    // for (const value of data.values()) {
    //   console.log('form values', value);
    // }

    
      let res = await fetch(AthletesURL+`/${params.athleteId}`, {
      method: "put",
      body: data,
    })
      .then((response) => {
        if (response.status === 201) {
          response.json();
          toast.success("Updated Successfully");
          history.push("/athletes");
        } else {
          toast.error("Something invalid happened");
        }
      })

      .catch((error) => {
        toast.error("Something invalid happened");
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
        athleteName: athlete?.athleteName,
        dateofBirth: athlete?.dateofBirth,
        category_id: athlete?.category_id?._id,
        categoryName: athlete?.category_id?.categoryName,
        drill_id: athlete?.drill_id,
        photo: null,
      }}
      // onSubmit={values=>{console.log(values);}}
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
                <p className="login-box-msg">Edit an Athlete</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                       className={'form-control' + (errors.athleteName && touched.athleteName ? ' is-invalid' : '')}
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
                  {errors.athleteName &&
                    touched.athleteName &&
                    (<div className ="error">{errors.athleteName}</div>)}
                  <div className="input-group mb-3">
                    <input
                       className={'form-control' + (errors.dateofBirth && touched.dateofBirth ? ' is-invalid' : '')}
                      type="date"
                      name="dateofBirth"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={moment(new Date(values.dateofBirth)).format(
                        "YYYY-MM-DD"
                      )}
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
                      id="category_id"
                      name="category_id"
                      onChange={handleChange}
                    >
                      <option value={values.category_id}>
                        {values.categoryName}
                      </option>
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
                  {errors.category_id &&
                    touched.category_id &&
                    (<div className ="error">{errors.category_id}</div>)}

                  <div className="input-group mb-3">
                    <MultiSelect
                      class="form-control"
                      displayValue="label"
                      value={items}
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
                  {errors.drill && touched.drill && (<div className ="error">{errors.drill}</div>)}

                  <img
                    class="image"
                    src={
                      values.photo
                        ? URL.createObjectURL(values.photo)
                        : PhotoURL +
                          athlete?.photo
                    }
                    alt="Athlete Image"
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
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                  {errors.photo && touched.photo && (<div className ="error">{errors.photo}</div>)}
                  <div className="row">
                    <div className="col-8"></div>
                    {/* /.col */}
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

export default EditAthlete;
