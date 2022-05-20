import React, { Component } from 'react';
import clarifai from 'clarifai';
import Navigation from './Component/navigation/navigation';
import Logo from './Component/Logo/Logo';
import ImageLinkForm from './Component/imageLinkForm/imageLinkForm';
import Rank from './Component/Rank/Rank';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import SignIn from './Component/SignIn/SignIn';
import Register from './Component/register/register';




import './App.css';

class App extends Component{
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: "",
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

calculateFaceLocation = (data) => {

}

  onInputChange = (event) => {
   this.setState({input: event.target.value});
  }

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input})
  const raw = JSON.stringify({
    "user_app_id": {
          "user_id": "d07jjd23e48i",
          "app_id": "2c2b52a252d5457d8e486b25e06fe6eb"
      },
    "inputs": [
      {
        "data": {
          "image": {
            "url": "https://samples.clarifai.com/metro-north.jpg"
          }
        }
      }
    ]
  });
  
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'ede503b5645547ec8c36162fae906b99'
    },
    body: raw
  };
  fetch("https://api.clarifai.com/v2/aaa03c23b3724a16a56b629203edc62c/outputs", requestOptions)
  .then(response => response.text())
  .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data))
  .catch(error => console.log('error', error));
}


onRouteChange =(route) => {
  this.setState({route: route});
  if ( this.state.route === 'signout'){
    this.setState({isSignedIn: false})
  }
  else if (this.state.route === 'home'){
    this.setState({isSignedIn: true})
  }
}

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className='App'>
      <Navigation onRouteChange={this.onRouteChange}
      isSignedIn={isSignedIn}/>
      
       { route === 'home' 
       ? <div>
       <Logo />
       <Rank />
    <ImageLinkForm 
       onInputChange={this.onInputChange} 
       onButtonSubmit={this.onButtonSubmit}/>
<FaceRecognition imageUrl={imageUrl}/>
    </div>
         :(
          route === 'signin' ?
          <SignIn onRouteChange={this.onRouteChange}/>
          :<Register onRouteChange={this.onRouteChange}/>
         )
  }
    </div>
  );}
}

export default App;
