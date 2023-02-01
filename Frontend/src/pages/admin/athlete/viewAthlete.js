import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../main.css";
import { AthletesURL, DrillsURL } from "../../../config/url-constant";

const ViewAthlete = () => {
  const [athletes, setAthletes] = useState([]);
  //   const params = useParams();
  const { athleteId } = useParams();
  const history = useHistory();
  useEffect(() => {
    const fetchathletes = async () => {
      console.log(athleteId);
      const response = await fetch(AthletesURL+`/${athleteId}`
      );
      const responseData = await response.json();
      console.log(responseData);
      setAthletes(responseData);
    };
    fetchathletes();
  }, []);
  const deleteDrill = async (id) => {
    console.log(id);
    // const response = await fetch(`http://localhost:8080/drill/${id}`, {
      const response = await fetch(DrillsURL+`/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        response.json();
        if (response.ok) {
          toast.success(
            "Drill and all videos in this drill deleted successfully"
          );

          history.push("/drills");
        } else {
          toast.error(`Drill doesn't deleted `);
        }
      })

      .catch((error) => {
        toast.error(`Something went wrong`);
        console.error(error);
      });
  };
  return (
    <div>
      <div>
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Drills</h1>
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
                      <h3 class="card-title">{athletes?.athleteName}</h3>
                      <div class="card-tools">
                        <Link to="/add-drill"><i class="fas fa-plus"></i>&nbsp;
                          Add Drill
                        </Link>
                      </div>
                    </div>

                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr style={{ padding: "15px" }}>
                            <th>Drill Name</th>
                            <th style={{ width: "40px" ,paddingLeft:"250px" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {athletes?.drill_id?.length === 0 ? (
                            <>
                              <tr>
                                <td>No drill found related to {athletes.athleteName} </td>
                              </tr>
                            </>
                          ) : (
                            athletes?.drill_id?.map((drill) => (
                              <>
                                <tr key={drill._id}>
                                  <td style={{padding:"25px"}}>{drill.drillName}</td>

                                  <td style={{padding:"25px",textAlign:"center"}}>
                                   
                                    <Link to={`/viewdrill/${drill._id}`}>
                                      <span><i class="fas fa-eye iconcolor"></i></span>
                                    </Link>
                                  </td>
                                  <td style={{padding:"25px"}}>
                                    <Link
                                      to={`/drills/${drill._id}`}
                                      
                                    >
                                      <span>
                                        <i class="fas fa-edit"></i>
                                      </span>
                                    </Link>
                                  </td>
                                  <td style={{padding:"25px"}}>
                                    <i class="fas fa-trash deleteicon"
                                      onClick={() => deleteDrill(drill._id)}
                                    >
                                     </i>
                                    
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
    </div>
  );
};

export default ViewAthlete;
