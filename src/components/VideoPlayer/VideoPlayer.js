import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import videojs from 'video.js';
import './VideoPlayer.css';
import Navbar from '../Navbar/Navbar';


class VideoPlayer extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      videoJsOptions: null,
     
    }
   
  }

  componentDidMount() {
    
    axios.get('https://videoappyuvi.herokuapp.com/api/videolist', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    }).then(res => {
        res.data.map(video => {
        
         const id = window.location.href.split('/')[4]

        if (video.upload_title === id)  {
          this.setState({
            loaded: true,
            videoJsOptions: {
              autoplay: false,
              controls: true,
              sources: [{
                src: video.video_path
              }],
              fluid: true
            }
          }, () => {
            this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
              
            });
          });
        }
      });
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    if (!localStorage.getItem('userTokenTime')) return <Navigate to="/signIn" />
    return (
     <>
     <Navbar />
        <div className="row" style={{ width: "100vw" }}>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
            {this.state.loaded ? (
              <div data-vjs-player>
                <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" />
              </div>
            ) : ' Loading ... '}
          </div>
        </div>
        </>
    );
  }
}

export default VideoPlayer;