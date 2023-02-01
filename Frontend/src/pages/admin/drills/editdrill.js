import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DrillsURL, GetDrillsURL } from "../../../config/url-constant";

const validate = Yup.object().shape({
  drillName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Drill name is required"),
});

function EditDrill() {
  const [drills, setDrills] = useState([]);

  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    const fetchdrill = async () => {
      const response = await fetch(DrillsURL+`/${params.drillId}`
       
      );
      const responseData = await response.json();
      console.log(responseData);
      setDrills(responseData);
    };
    fetchdrill();
  }, []);

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(params.drillId);

    
      let res = await fetch(DrillsURL+`/${params.drillId}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        response.json();
        if (response.status===201) {
          history.push("/drills");
          toast.success(`Drill updated successfully`);
         
        }else{
          toast.error("Drill doesn't updated successfully");
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
        drillName: drills?.drills?.drillName,
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
                <p className="login-box-msg">Update Drill Name</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                     className={'form-control' + (errors.photo && touched.photo ? ' is-invalid' : '')}
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
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                    </div>
                    {errors.drillName && touched.drillName && (<div className ="error">{errors.drillName}</div>) }
                  
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

export default EditDrill;
