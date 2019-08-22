//this file will hold the search and tracks component
import React from 'react';
//fragments allow us to render multiple elements in a component

import Tracks from '../tracks/Tracks'; //import Tracks component
import Search from '../tracks/Search'; //import Search component

const Index = () => {
  return (
   <React.Fragment>
        <Search />
       <Tracks />
   </React.Fragment>
  )
}

export default Index;
