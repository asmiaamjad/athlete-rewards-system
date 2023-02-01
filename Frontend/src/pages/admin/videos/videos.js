import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// const token = localStorage.getItem("token");
import {toast} from 'react-toastify';
import { VideosURL } from "../../../config/url-constant";
const Videos = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchvideos();
  }, []);
  const fetchvideos = async () => {
    const response = await fetch(VideosURL);
    const responseData = await response.json();
    console.log(responseData);
    // console.log(responseData.categoryName);
    setVideos(responseData);
  };

  const deletevideo = async (id) => {
    // console.log(id);
    const response = await fetch(VideosURL+`/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      // response.json();
      if (response.status === 204) {
        toast.success("Video deleted Successfully");
        fetchvideos();
      } else {
        toast.error(`Video doesn't deleted`);
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
                    <h3 class="card-title">All Videos</h3>
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
                          <th>Video Title</th>
                          <th>Points</th>
                          <th>Drill Name</th>
                          <th style={{ width: "40px",paddingLeft:"60px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {videos.map((video) => (
                          <>
                            <tr key={video._id}>
                              <td>
                                <video class="video">
                                
                                  <source
                                    src={
                                      VideosURL +
                                      video.videoUrl
                                    }
                                    alt="videos"
                                  />
                                </video>
                              </td>
                              <td style={{padding:"25px"}}>{video.title}</td>
                              <td style={{padding:"25px"}}>{video.points}</td>
                              <td style={{padding:"25px"}}>{video?.drillId?.drillName}</td>

                              <td style={{padding:"25px"}}>
                              <Link
                                  to={`/viewvideo/${video._id}`}
                                
                                >
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

export default Videos;
