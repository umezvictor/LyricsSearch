
import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import '../../assets/main.css';

 class Search extends Component {
     /*
     when we type a song title in the search bar, the top 10 tracks disapparfrom the dom, 
     and is replaced with the data fetchd from the api

     we need to connect the search component to the context using the consumer
     */

    state = {
        //the name attribute of the form input field below must be equalt to 'trackTitle'
        trackTitle: ''
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    findTrack = (dispatch,e) => { 
        e.preventDefault();

        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s-track_rating=desc&apikey=5deff020c4cc1fb3e138df5b84eae06d`)
        .then(res => {
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list//this payload is sent to the reducer in context.js
            });

            //clear the form input when the search results are displayed
            this.setState({trackTitle: ''});
        })
        .catch(err => console.log(err));
    }
  render() {
    return (
      <Consumer>
          {value => {
              const { dispatch } =  value;
              return (
                <div className="card card-body mb-4 p-4">
                    <h1 className="display-4 text-center3">
                        <i className="fas fa-music" /> Search for a song
                    </h1>
                    <p className="lead text-center2">Get lyrics for any song</p>
                    <form onSubmit={this.findTrack.bind(this, dispatch)}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                placeholder="Song title..." 
                                name="trackTitle" 
                                value={this.state.trackTitle}
                                onChange={this.onChange}
                                />
                        </div>
                        <button className="btn btn-info btn-lg btn-block mb-5" type="submit">Get track lyrics</button>
                    </form>
                </div>
              );
          }}
      </Consumer>
    )
  }
}

export default Search;