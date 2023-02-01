import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {DrillsURL} from "../../../config/url-constant";
// Creating schema
const validate = Yup.object().shape({
  drillName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Drill name is required"),
});

function AddDrill() {
  const [drill, setDrill] = useState("");
  const history = useHistory();

  const onSubmit = async (values, actions) => {
    console.log(values);

   
      let res = await fetch(DrillsURL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        response.json();
        setDrill(response);
        if (response.status===201) {
          toast.success("Drill added successfully");
          history.push("/drills");
        } else {
          toast.error(`Drill already exist `);
        }
      })

      .catch((error) => {
        toast.error(`Something went wrong`);
        console.error(error);
      });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  return (
    <Formik
      validationSchema={validate}
      initialValues={{
        drillName: "",
      }}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <div class="hold-transition register-page">
          <div class="register-box">
            <div class="card card-outline card-primary">
              <div class="card-header text-center">
                <h1 class="h1">
                  <b>Drill</b>
                </h1>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Add a Drill</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                      className={'form-control' + (errors.drillName && touched.drillName ? ' is-invalid' : '')}
                      type="text"
                      name="drillName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.drillName}
                      placeholder="Drill Name"
                      id="drillName"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                    </div>
                    {errors.drillName && touched.drillName && (<div className ="error">{errors.drillName}</div>)}
                  

                  <div className="row">
                    <div className="col-8"></div>

                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={!validate}
                      >
                        Add Drill
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

export default AddDrill;
