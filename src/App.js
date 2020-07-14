import React from 'react';
import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import json from './data/rutas-lima.json';
import limaRoutes from './data/routes.json';
import firebase from './config.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('routes');
    this.unsubscribe = null;
    this.state = {
      routes: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const routes = [];
    querySnapshot.forEach((doc) => {
      const { name, direction, coordinates } = doc.data();
      routes.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        direction,
        coordinates,
      });
    });
    this.setState({
      routes
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }



  render() {
    function directionType (name){
      let direction= '';
      if(name.includes('Ida')){
        direction = "ida";
      }else{
        if(name.includes('Vuelta')){
          direction = "vuelta";
        }
      }
      return direction;
    }

    async function addCoords (ref, coord){
      for(let j=0; j<coord.length; j++){
        console.log(coord[j])
        await ref.collection('coordinates').doc(j.toString()).set({
          // coord: coord[j],
          lat: coord[j][0],
          lng: coord[j][1]
        });
      }
    }

    function handleClick(e) {
      e.preventDefault();
      const features = limaRoutes.features
      for(let i=0; i<features.length; i++){
        let coord = features[i].geometry.coordinates;
        // coord.push(features[i].geometry.coordinates)
        const newRoute = {
          name: features[i].properties.name,
          direction: directionType(features[i].properties.name)
        }
        firebase.firestore().collection('routes').add(newRoute).then( async function(docRef) {
          let ref = firebase.firestore().collection('routes').doc(docRef.id);
        // if(i == (features.length) - 1){
        //   ref.update({
        //             coordinates: firebase.firestore.FieldValue.arrayUnion(coord[0])
        //   });
        // }
        await addCoords(ref, coord);
            
          

      })
      }
      // limaRoutes.features.forEach(route => {
        
        
      //   console.log(coord[0])
        
       
      //   firebase.firestore().collection('routes').add(newRoute)
      //   .then(function(docRef) {
      //     console.log(docRef.id);
      //     let ref = firebase.firestore().collection('routes').doc(docRef.id);
      //     coord.forEach(coordinate => {
      //       console.log(coordinate)
      //       ref.update({
      //         coordinates: firebase.firestore.FieldValue.arrayUnion(coordinate)
      //       });
      //     });
      //     // Atomically add a new coordinate to the "coordinates" array field.

      // });
      // });
    }
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            YEGO! admin
          </p>
          <button onClick={handleClick}>Guardar rutas</button>
        </header>
      </div>
    );
  }
}

export default App;
