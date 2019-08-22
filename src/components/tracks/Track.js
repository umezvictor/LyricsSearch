import React from 'react';

//import react router , don't use a tag when using react rout
import { Link } from 'react-router-dom';
import '../../assets/main.css';

//this is a functional component, cos t doesn't need its own state
//pass in the tracks (from the api response) as a prop
const Track = (props) => {
    //use destructuring to avoid repeating track
    //track is a prop, as shown in Tracks.js, hence there is access to prop
    const {  track } = props;
    //display content
  return (
    <div className="col-md-6">
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
                <h5>{track.artist_name}</h5>
                <p className="card-text">
                    <strong className="track-icons"><i className="fas fa-play"></i>Track:  </strong>{track.track_name}
                    <br/>
                    <strong  className="album-icons"><i className="fas fa-compact-disc"></i>Album:  </strong>{track.album_name}
                </p>
                <Link 
                to={`lyrics/track/${track.track_id}`} 
                className="btn btn-info btn-block">
                  View Lyrics</Link>
            </div>

        </div>
      
    </div>
  );
};

export default Track;