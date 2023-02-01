import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { DrillsURL, VideosURL } from "../../../config/url-constant";
const SUPPORTED_FORMATS = ["video/mp4", "video/MPEG", "video/MKV"];

// Creating schema
const validate = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Video title is required"),
  points: Yup.number()
    .positive()
    .integer()
    .required("video points are required"),
  drillId: Yup.string().required("Drill is required"),
  videoUrl: Yup.mixed()
    .nullable()
    .required("A Video is required")
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

function AddVideo() {
  const [file, setFile] = useState("");
  const [drill, setDrill] = useState("");
  const history = useHistory();
  useEffect(() => {
    const getdrill = async () => {
      let res = await fetch(DrillsURL);
      let responseJson = await res.json();
      setDrill(responseJson);
    };
    getdrill();
  }, []);

  const onSubmit = async (values, actions) => {
    console.log(values);
    const data = new FormData();
    console.log(file);
    data.append("title", values.title);
    data.append("points", values.points);
    data.append("drillId", values.drillId);
    data.append("videoUrl", file);
    let res = await fetch(VideosURL, {
      method: "post",
      body: data,
    })
      .then((response) => {
        response.json();
        if (response.status === 201) {
          toast.success(`Video added successfully`);
          history.replace("/video");
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
        title: "",
        points: "",
        drillId: "",
        videoUrl: null,
      }}
      //   onSubmit={values => {
      //     console.log(values);
      //   }}
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
                  <b>Videos</b>
                </h1>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Add a Video</p>

                <Form>
                  <div className="input-group mb-3">
                    <input
                      className={
                        "form-control" +
                        (errors.title && touched.title ? " is-invalid" : "")
                      }
                      type="text"
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      placeholder="Video Title"
                      id="title"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                  {errors.title && touched.title && (
                    <div className="error">{errors.title}</div>
                  )}

                  <div className="input-group mb-3">
                    <input
                      className={
                        "form-control" +
                        (errors.points && touched.points ? " is-invalid" : "")
                      }
                      type="number"
                      name="points"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.points}
                      placeholder="Enter Points"
                      id="points"
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                  {errors.points && touched.points && (
                    <div className="error">{errors.points}</div>
                  )}

                  <div className="input-group mb-3">
                    <select
                      className={
                        "form-control" +
                        (errors.drillId && touched.drillId ? " is-invalid" : "")
                      }
                      value={values.drillId}
                      id="drillId"
                      name="drillId"
                      onChange={handleChange}
                      placeholder="Select a drill"
                    >
                      <option value="">Select a drill</option>
                      {drill.length > 0 &&
                        drill.map((drill) => (
                          <option key={drill._id} value={drill._id}>
                            {drill.drillName}
                          </option>
                        ))}
                    </select>
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-square" />
                      </div>
                    </div>{" "}
                  </div>
                  {errors.drillId && touched.drillId && (
                    <div className="error">{errors.drillId}</div>
                  )}

                  <div className="input-group mb-3">
                    <input
                      className={
                        "form-control" +
                        (errors.videoUrl && touched.videoUrl
                          ? " is-invalid"
                          : "")
                      }
                      id="videoUrl"
                      name="videoUrl"
                      type="file"
                      onChange={(event) => {
                        setFieldValue("videoUrl", event.currentTarget.files[0]);
                        setFile(event.currentTarget.files[0]);
                      }}
                      // value={values.photo}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                  {errors.videoUrl && touched.videoUrl && (
                    <div className="error">{errors.videoUrl}</div>
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
                        Add
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

export default AddVideo;
