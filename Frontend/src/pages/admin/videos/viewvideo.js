import React from 'react';
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import { VideosURL } from '../../../config/url-constant';
const ViewVideo = () => {
    const params = useParams();
    const [Videos, setVideos] = useState([]);
    
    useEffect(() => {
      const fetchvideos = async () => {
        console.log(params.videoId);
        const id= params.videoId
        const response = await fetch(VideosURL+ `/${id}`);
        const responseData = await response.json();
        console.log(responseData.videoUrl);
        
        setVideos(responseData);
      };
      fetchvideos();
    }, []);

    useEffect(() =>{
      console.log('videos', Videos)
    },[Videos])
  
  return (
   
    <div>
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Video</h1>
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
                <h3 class="card-title">{Videos?.title}</h3>
              </div>
              <div class="card-body">
                {
                  Videos.length!==0 &&  <video style={{ width: "90%" }} controls>
                  <source
                    src={VideosURL + Videos.videoUrl}
                    alt="videos"
                  />
                </video>
                }
                
              </div>

              <span></span>
            </div>

            </div>
      </div> 
          </div>
        </section>
       
    </div>
  </div>
  )
}

export default ViewVideo
