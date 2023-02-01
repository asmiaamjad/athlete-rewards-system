import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../main.css";
import { AthletesURL, PhotoURL } from "../../../config/url-constant";
const Categories = () => {
  const [athletes, setAthletes] = useState([]);
  useEffect(() => {
    fetchathletes();
  }, []);
  const fetchathletes = async () => {
    // const response = await fetch("http://localhost:8080/athlete");
    const response = await fetch(AthletesURL);
    const responseData = await response.json();
    console.log(responseData);

    setAthletes(responseData);
  };

  const deleteathlete = async (id) => {
    console.log(id);
    // const response = await fetch(`http://localhost:8080/athlete/${id}`, {
    const response = await fetch(AthletesURL + `/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          toast.success("Athlete deleted Successfully");
          fetchathletes();
        } else {
          toast.error(`Athlete doesn't deleted `);
        }
      })

      .catch((error) => {
        toast.error(`Something went wrong`);
        console.error(error);
      });
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
                    <h3 class="card-title">All Athletes</h3>
                    <div class="card-tools">
                      <Link to="/addathlete">
                        <i class="fas fa-plus" />
                        &nbsp; Add Athlete
                      </Link>
                    </div>
                  </div>

                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr style={{ padding: "15px" }}>
                          <th>Image</th>
                          <th>Athlete Name</th>
                          <th>Category Name</th>
                          <th style={{ textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {athletes.map((athlete) => (
                          <>
                            <tr key={athlete._id}>
                              <td>
                                <img
                                  class="image"
                                  src={PhotoURL + athlete.photo}
                                  alt="Athlete Image"
                                />
                              </td>
                              <td style={{ padding: "25px" }}>
                                {athlete.athleteName}
                              </td>
                              <td style={{ padding: "25px" }}>
                                {athlete?.category_id?.categoryName}
                              </td>
                              <td
                                style={{ padding: "25px", textAlign: "center" }}
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
                        ))}
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

export default Categories;
