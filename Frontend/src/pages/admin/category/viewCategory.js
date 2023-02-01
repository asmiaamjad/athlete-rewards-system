import React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../main.css";
import { CategoriesURL, PhotoURL } from "../../../config/url-constant";
const Viewdrill = () => {
  const params = useParams();
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    const fetchathletes = async () => {
      const response = await fetch(CategoriesURL + `/${params.categoryId}`);
      const responseData = await response.json();
      console.log(responseData.category.categoryName);
      setAthletes(responseData);
    };
    fetchathletes();
  }, []);
  const deleteathlete = async (id) => {
    const response = await fetch(CategoriesURL + `/${id}`, {
      method: "DELETE",
    });
    const responseData = await response.json();
    console.log(responseData);
  };
  return (
    <div>
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Athletes</h1>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">
                      {athletes?.category?.categoryName}
                    </h3>
                    <div class="card-tools">
                      <Link to="/addathlete">
                        <i class="fas fa-plus"></i> &nbsp; Add Athlete
                      </Link>
                    </div>
                  </div>

                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr style={{ padding: "15px" }}>
                          <th>Image</th>
                          <th>Athlete Name</th>

                          <th style={{ width: "40px", paddingLeft: "190px" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {athletes?.athlete?.length === 0 ? (
                          <>
                            <tr>
                              <td>No Athlete found in this category</td>
                            </tr>
                          </>
                        ) : (
                          athletes?.athlete?.map((athlete) => (
                            <>
                              <tr key={athlete._id}>
                                <td>
                                  <img
                                    class="image"
                                    src={
                                      PhotoURL +
                                      athlete.photo
                                    }
                                    alt="Athlete Image"
                                  />
                                </td>
                                <td style={{ padding: "25px" }}>
                                  {athlete.athleteName}
                                </td>

                                <td
                                  style={{
                                    padding: "25px",
                                    textAlign: "center",
                                  }}
                                >
                                  <Link to={`/viewathletes/${athlete._id}`}>
                                    <span>
                                      <i class="fas fa-eye iconcolor"></i>
                                    </span>
                                  </Link>
                                </td>
                                <td style={{ padding: "25px" }}>
                                  <Link to={`/athletes/${athlete._id}`}>
                                    <span>
                                      <i class="fas fa-edit"></i>
                                    </span>
                                  </Link>
                                </td>
                                <td style={{ padding: "25px" }}>
                                  <i
                                    class="fas fa-trash deleteicon"
                                    onClick={() => deleteathlete(athlete._id)}
                                  ></i>
                                </td>
                              </tr>
                            </>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Viewdrill;
