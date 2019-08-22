//lyrics component shows the entire lyrics
import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

/*
to format date to a more readable format
install these two packages
npm i moment react-moment
*/
 class Lyrics extends Component {
        /*
            this data is only needed for this component,  
            that is why it is here, rather than in the context.js

            two api calls wil be made here

            this is a component level state
        */
    state = {
        track: {},
        lyrics: {}
    }

    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=5deff020c4cc1fb3e138df5b84eae06d`)
        .then(res => {
           //console.log(res.data);
            //change the state when the data arrives
            //populates or fills the state with the retrieved data
            this.setState({lyrics: res.data.message.body.lyrics});//store tthe contents of res.data.message.body.track_list inside track_list array above 
            //return axios request to get track data
           return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=5deff020c4cc1fb3e138df5b84eae06d`);
        })
        //get result of the other get request
        .then(res => {
            //console.log(res.data);
            //populate the other state 'track' with the data
            this.setState({track: res.data.message.body.track});
        })
        .catch(err => console.log(err));
    }
  render() {
      //use destructuring to pull out the track and lyrics from the state
      const { track, lyrics } = this.state;
        //conditional rendering
        if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0){
            //show spinner track, lyrics is undefine or an empty object
            return <Spinner />
        }else{
            //display data
            return (
               <React.Fragment>
                  <Link to="/" className="btn btn-danger btn-sm mb-4">Go back</Link>
                  <div className="card">
                        <h5 className="card-header">
                            {track.track_name} {''} by {''}
                            <span className="text-secondary">{track.artist_name}</span> 
                        </h5>
                        <div className="card-body">
                            <p className="card-text">
                                {lyrics.lyrics_body}
                            </p>
                        </div>
                   </div> 
                   <ul className="list-group mt-3">
                        <li className="list-group-item">
                            <strong className="track-icons">Album ID</strong>: {track.album_id}
                        </li>
                        <li className="list-group-item">
                            <strong className="track-icons">Music ID</strong>: {''} 
                            {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                        </li>
                        <li className="list-group-item">
                        <strong className="track-icons">Explicit words</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
                        </li>
                        <li className="list-group-item">
                            <strong className="track-icons">Release date</strong>: <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
                        </li>
                   </ul>
               </React.Fragment> 
            );
        }
  }
}

export default Lyrics;
