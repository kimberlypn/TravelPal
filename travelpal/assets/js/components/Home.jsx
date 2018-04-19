import React from 'react';
import { connect } from 'react-redux';
import HotelCard from './HotelCard'
import api from '../api';

// Renders the home page
function Home(props) {
  let hotels = _.map(props.hotels, (uu) => <HotelCard key={uu.id} name={uu.name} district={uu.district}
    price={uu.price} link={uu.link} rating={uu.rating} image={uu.image_src} />);

  return (
    <div className="page-content">
      Home
      {hotels}
    </div>
  );
};

function state2props(state) {
  return {

  };
};

export default connect(state2props)(Home);
