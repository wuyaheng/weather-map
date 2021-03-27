import React, { Component } from 'react';
import './App.css';
import MapBox from "./components/MapBox/index";
import geodata from "./data/us.geojson";
import axios from "axios";


class App extends Component {
  state = {
    geo: []
  }


  componentDidMount() {
    this.fetchdata()
  }



  fetchdata = async () => {
    try {
      const res = await axios.get(geodata);
      this.setState({
        geo: res.data.features
      });
    } catch (error) {
      console.log(error)
    }
  } 




  render() { 

    let geoDataToDisplay = this.state.geo;
      return (
        <>        
        <div className="container-fluid mt-0">
        <div className="row mb-0">
        <div className="col-md-12">
        <div className="card mb-2">
        <MapBox results = {geoDataToDisplay}/>
          </div>
        </div>
        </div>
        </div> 
        </>
      );
    } 
}
export default App;
