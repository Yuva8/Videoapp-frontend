import React from 'react';
import { Link,Navigate } from 'react-router-dom';
import axios from 'axios';

import './Dashboard.css';
import Navbar from '../Navbar/Navbar';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    let shouldNavigate = false;
    if (localStorage.getItem('userTokenTime')) {
      const data = JSON.parse(localStorage.getItem('userTokenTime'));
      if (new Date().getTime() - data.time > (1 * 60 * 60 * 1000)) {
       localStorage.removeItem('userTokenTime');
        shouldNavigate = true;
      }
    } else {
      shouldNavigate = true;
    }

    this.state = {
      Navigate: shouldNavigate,
      videoList: []
    }
  }

  componentDidMount() {
    if (localStorage.getItem('userTokenTime')) {
      axios.get('https://videoappyuvi.herokuapp.com/api/videolist', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
        }
      }).then(res => {
        this.setState({
          videoList: res.data
         
        });
        console.log(res.data);
      });
    }
  }

  render() {
    if (this.state.Navigate) return <Navigate to="/signin" />

    const videos = this.state.videoList.map(video => {
      return (
        <div className="video col-xs-12 col-sm-12 col-md-3 col-lg-4" key={video._id}>
          <Link to={'/video/' + video.upload_title}>
            <div className="video-thumbnail">
              <img src={video.thumbnail_path} alt="video thubmnail" />
            </div>
          </Link>
         
          <span className="username">
            <Link to={'/api/videos/' + video.upload_title}>
              {video.uploader_name}
            </Link>
          </span>
          <span className="video-title">{video.upload_title.replace(/_/g, ' ')}</span>
        </div>
      );
    });

    return (
      <>
       <Navbar />
        <div className="container mt-5">
          <h4>Videos</h4>
          <hr className="my-4" />

          <div className="streams row">
            {videos}
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;