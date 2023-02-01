import React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../main.css";
import { DrillsURL, VideosURL } from "../../../config/url-constant";
const Viewdrill = () => {
  const [drills, setDrills] = useState([]);
  const params = useParams();
  useEffect(() => {
    console.log(params.drillId);
    const fetchdrills = async () => {
      const response = await fetch(
        DrillsURL+`/${params.drillId}`
      );
      const responseData = await response.json();
      console.log(responseData.drills.drillName);
      setDrills(responseData);
    };
    fetchdrills();
  }, []);
  const deletevideo = async (id) => {
    
    const response = await fetch(DrillsURL+`/${id}`, {
      method: "DELETE",
    });
    const responseData = await response.json();
    console.log(responseData);
    // fetchdrills();
  };
  return (
    <div>
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Videos</h1>
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
                    <h3 class="card-title">{drills?.drills?.drillName}</h3>
                    <div class="card-tools">
                      <Link to="/addvideo"><i class="fas fa-plus"></i>&nbsp;
                        Add Video
                      </Link>
                    </div>
                  </div>

                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr style={{ padding: "15px" }}>
                          <th>Video</th>
                          <th>Video title</th>
                          <th>Points</th>
                          <th style={{ width: "40px" ,paddingLeft:"190px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {drills?.message ? (
                          <>
                            <tr>
                              <td>
                                {drills.message}
                              </td>
                            </tr>
                          </>
                        ) : (
                          drills?.videos?.map((video) => (
                            // {drills?.videos?.map((video) => (
                            <>
                              {/* <div key={user._id}></div> */}
                              <tr key={video._id}>
                                <td>
                                  <video style={{
                                      borderRadius: "50%",
                                      border: "1px solid #C1C1C1",
                                      width: "50px",
                                      height: "50px",
                                    }}>
                                    <source
                                      src={VideosURL+
                                        // "http://localhost:8080/videos/" +
                                        video.videoUrl
                                      }
                                      alt="videos"
                                    />
                                  </video>
                                </td>
                                <td style={{padding:"25px"}}>{video.title}</td>
                                <td style={{padding:"25px"}}>{video.points}</td>
                                <td style={{padding:"25px", textAlign:"center"}}>
                                  <Link to={`/viewvideo/${video._id}`}>
                                    <span><i class="fas fa-eye iconcolor"></i></span>
                                  </Link>
                                </td>
                                <td style={{padding:"25px"}}>
                                  <Link
                                    to={`/video/${video._id}`}
                                  >
                                    <span>
                                      <i class="fas fa-edit"></i>
                                    </span>
                                  </Link>
                                </td>
                                <td style={{padding:"25px"}}>
                                 <i class="fas fa-trash deleteicon"
                                    onClick={() => deletevideo(video._id)}>
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
  );
};

export default Viewdrill;
