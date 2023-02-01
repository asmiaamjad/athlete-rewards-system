import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import moment from "moment";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DrillsURL, VideosURL } from "../../../config/url-constant";

const validate = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Video title is required"),
  points: Yup.number().positive().integer().required("Points are required"),
  drillId: Yup.string().required("Drill is required "),

});

function EditAthlete() {

  const [video, setVideo] = useState("");
  const [drills, setDrills] = useState("");
  const params = useParams();

  const history = useHistory();
  useEffect(() => {
    const fetchvideo = async () => {
      const response = await fetch(
        VideosURL+`/${params.videoId}`
      );
      const responseData = await response.json();
      setVideo(responseData);
    };
    const getdrill = async () => {
      let res = await fetch(DrillsURL);
      let responseJson = await res.json();
      setDrills(responseJson);
    };
    fetchvideo();
    getdrill();
  }, []);

  const onSubmit = async (values, actions) => {
    console.log(params.videoId);
    let res = await fetch(VideosURL+`/${params.videoId}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
   
      .then((response) => {
        response.json();
        if(response.status===201){
          console.log(response);
          toast.success("Video updated Successfully");
          history.push("/video");
        }
        else{
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
      enableReinitialize={true}
      initialValues={{
        title: video.title,
        points: video.points,
        drillId: video?.drillId?._id,
        drillName: video?.drillId?.drillName,
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
        // setFieldValue,
      }) => (
        <div class="hold-transition register-page">
          <div class="register-box">
            <div class="card card-outline card-primary">
              <div class="card-header text-center">
                <h1 class="h1">
                  <b>Video</b>
                </h1>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Update a video</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                      className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}
                      type="text"
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      placeholder="video Title"
                      id="title"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div></div>
                    {errors.title && touched.title && (
                        <div className="error">{errors.title}</div>
                      )}
                  
                  <div className="input-group mb-3">
                    <input
                      className={'form-control' + (errors.points && touched.points ? ' is-invalid' : '')}
                      type="number"
                      name="points"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.points}
                      placeholder="Points"
                      id="points"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="far fa-calendar-alt" />
                      </div>
                    </div></div>
                    {errors.points && touched.points && (
                        <div className="error">{errors.points}</div>
                      )}
                  
                  <div className="input-group mb-3">
                    <select
                      className={'form-control' + (errors.drillId && touched.drillId ? ' is-invalid' : '')}
                      id="drillId"
                      name="drillId"
                      onChange={handleChange}
                    >
                      <option value={values.drillId}>{values.drillName}</option>
                      {drills.length > 0 &&
                        drills.map((drill) => (
                          <option key={drill._id} value={drill._id}>
                            {drill.drillName}
                          </option>
                        ))}
                    </select>
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-square" />
                      </div>
                    </div>
                  </div>
                  {errors.drillId && touched.drillId && (
                        <div className="error">{errors.drillId}</div>
                      )}
                 
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
