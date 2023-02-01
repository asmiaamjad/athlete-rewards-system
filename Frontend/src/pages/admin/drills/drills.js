import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DrillsURL } from "../../../config/url-constant";
import "../main.css"
const Users = () => {
  const [drills, setDrills] = useState([]);
  useEffect(() => {
    fetchdrills();
  }, []);
  const fetchdrills = async () => {
    const response = await fetch(DrillsURL);
    const responseData = await response.json();
    console.log(responseData);
    setDrills(responseData);
  };

  const deleteDrill = async (id) => {
    console.log(id);
    
      const response = await fetch(DrillsURL+`/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      response.json();
      if (response.ok) {
        toast.success("Drill and all videos in this drill deleted successfully");
        fetchdrills();
      } else {
        toast.error(`Drill doesn't delete `);
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
                    <h3 class="card-title">All Drills</h3>
                    <div class="card-tools">
                      <Link to="/add-drill"><i class="fas fa-plus" />
                                           &nbsp;
                        Add Drill
                      </Link>
                    </div>
                  </div>

                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Drill Name</th>
                          <th style={{ width: "40px" ,paddingLeft:"190px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drills.map((drill) => (
                          <>
                            
                            <tr key={drill._id}>
                              <td>{drill.drillName}</td>

                              <td style={{textAlign:"center"}}>
                              <Link to ={`/viewdrill/${drill._id}`}>
                                <span><i class="fas fa-eye iconcolor"></i></span></Link>
                              </td>
                              <td>
                                <Link
                                  to={`/drills/${drill._id}`}
                                  // className="btn btn-primary"
                                >
                                  <span>
                                    <i class="fas fa-edit"></i>
                                  </span>
                                </Link>
                              </td>
                              <td><span>
                              <i class="fas fa-trash deleteicon"
                                  onClick={() => deleteDrill(drill._id)}></i></span>
                                
                                
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

export default Users;
