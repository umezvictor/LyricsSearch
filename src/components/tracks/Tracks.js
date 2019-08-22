import React, { Component } from 'react';

//import the consumer from context.js
import { Consumer } from '../../context'; //gives access to the state

//import spinner component
import Spinner from '../layout/Spinner';
//import Track component to display tracks, and details
import Track from '../tracks/Track';


 class Tracks extends Component {
  render() {
    return (
      <Consumer>
          {value => {
              //value is value passed in the Context Provider in context.js 
            //check if array is empty and show spinner
            // use destructuring to avoid using 'value' repeatedly
            const { track_list, heading } = value; //pull track_list, heading out of value
            //remember track_
            //heading is the heading in the state
            //show spinner component if tracklist is empty
            if(track_list === undefined || track_list.length === 0){
              return <Spinner />
            }else{
              return (
                //loop tru and display tracks in bootstrap grid
               <React.Fragment>
                 <h3 className="text-center mb-4">{heading}</h3>
                  <div className="row">
                      {track_list.map(item => (
                        //loop through the tracklist and display the Track component
                       //keys must be assigned when using map function
                       /*
                        the api
                        this my 'track' is a prop (the one below) i mean track={item.track} 
                       */
                        <Track key={item.track.track_id} track={item.track}/>
                      ))}
                  </div>
               </React.Fragment> 
              );
            }
         }}
      </Consumer>
       );
  }
}

export default Tracks;