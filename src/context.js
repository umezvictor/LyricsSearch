//using context api
import React, { Component } from 'react';
import axios from 'axios'; //axios is a library that helps in making api calls

const Context = React.createContext();
//provider is like any toher react provider
/*
provider wraps every other component, so that we can 
access the states in  in other components providesd we use 
the consumer
*/


//create reducer
const reducer = (state, action) => {
    switch (action.type){
        case 'SEARCH_TRACKS':
        return {
            ...state,//spread operator gives us everything from the state
            track_list: action.payload, //setting track_list in the global state to the new search result
            heading: 'Search Results'//heading changed to Search Results
        };
        default:
        return state;
    }
}




export class Provider extends Component {
//provideer state
//
    state = {
        track_list: [],
        heading: 'top 10 tracks',
        dispatch: action => this.setState(state => reducer(state, action))
    };

    /*fetch data from musixmatch api using axios,
    fetch api can also be used to get the data
    https://cors-anywhere.herokuapp.com/
    */
   //below is a proxy
   //https://cors-anywhere.herokuapp.com  this link is a TRICK/smart way to avoid cors error when making api call
   componentDidMount(){
       
       axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=5deff020c4cc1fb3e138df5b84eae06d`)
        .then(res => {
           //console.log(res.data);
            //change the state when the data arrives
            //populates or fills the state with the retrieved data
            this.setState({track_list: res.data.message.body.track_list});//store tthe contents of res.data.message.body.track_list inside track_list array above  
        })
        .catch(err => console.log(err));
  }

  render() {
    return (
        //accessing the state above
      <Context.Provider value={this.state}>
          {this.props.children}
      </Context.Provider>
    )
  }
}

export  const Consumer = Context.Consumer;  //this will  be imported into the components to be able to access the state
